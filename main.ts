import express, { NextFunction, Request, Response } from "express";
import { print } from "listening-on";
import { userRoutes } from "./routes/user.routes";
import { categoryRoutes } from "./routes/category.routes";
import path from "path";
import { client } from "./database";
import { eventRoutes } from "./routes/event.routes";
import { HttpError } from "./http-error";

let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(userRoutes);
app.use(categoryRoutes);
app.use(eventRoutes);

app.get("/", (req, res) => res.redirect("/category-list.html"));

//show category list on category-list.html
app.get("/category-list", async (req, res, next) => {
  try {
    let result = await client.query(/* sql */ `
      select
        id
      , name
      , image
      from category
    `);
    let categories = result.rows;
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// category-list.html: insert selected categories into database table 'category'
app.get("/category-result", async (req, res, next) => {
  try {
    let userID = 1; //req.session.user_id

    let categoryIdArray = req.query.category;

    let selectedId = Array.isArray(categoryIdArray)
      ? categoryIdArray
      : [categoryIdArray];

    if (Array.isArray(selectedId)) {
      for (let categoryId of selectedId) {
        let haveRecord = (
          await client.query(
            `select * from users_categories where user_id=$1 and  category_id=$2`,
            [userID, categoryId]
          )
        ).rows;

        if (haveRecord.length > 1) {
          res.status(400).json("record is existed");
          return;
        }
        let data = await client.query(
          /*sql*/
          `insert into "users_categories" (user_id, category_id, created_at, updated_at) 
        values ($1, $2, now(), now()) returning id`,
          [userID, categoryId]
        );
      }

      res.redirect("/home.html");
      return;
    }
    res.json({});
    // res.send('Data stored successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// generate users'categories on home.html
app.get("/userCategoryList", async (req, res, next) => {
  try {
    let result = await client.query(/* sql */ `
    select name, user_image 
    from users_categories 
    join category 
    on users_categories.category_id = category.id 
    where user_id=1`);

    let userCategoryChoices = result.rows;

    console.log(userCategoryChoices);

    res.json(userCategoryChoices);
  } catch (error) {
    next(error);
  }
});

// //TODO how to render selected categories into home.html by chloe
// app.get("/selected-category", async (req, res, next) => {
//   try {
//     let data = await client.query(/*sql*/ `select category from "category"`, [
//       req.query.category,
//     ]);
//     let categories = data.rows;
//     res.json(categories);
//     console.log(categories);

//     // console.log(data);
//     // res.render('otherPage',);
//   } catch (error) {
//     next(error);
//   }
// });

//TODO BY CHLOE
// app.get("/category-result", async (req, res, next) => {
//   let userId = 1; //req.session.user_id

//   let result = await client.query(`select * from user_category`);
// });

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500);
  if (req.headers.accept?.includes("application/json")) {
    res.json({ error: String(err) });
  } else {
    next(err);
  }
});

const port = 8000;
app.listen(port, () => print(port));
