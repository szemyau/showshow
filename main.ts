import express, { NextFunction, Request, Response } from "express";
import { print } from "listening-on";
import { userRoutes } from "./routes/user.routes";
import { categoryRoutes } from "./routes/category.routes";
import path from "path";
import { client } from "./database";
import { eventRoutes } from "./event";
import { HttpError } from "./http-error";

let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(userRoutes);
app.use(categoryRoutes);
app.use(eventRoutes);

app.get("/", (req, res) => res.redirect("/category-list.html"));

// try to insert selected categories into database; change insert data into 
app.get("/category-list", async (req, res, next) => {
  try {
    let categoryID = req.query.category;
    const selectedIDs = Array.isArray(req.query) ? categoryID : [categoryID];

    // Perform further processing with the selectedIDs array
    console.log(categoryID);

    let data = await client.query(
      /*sql*/
      `insert into "users_category" (category, created_at, updated_at) 
        values ($1, now(), now()) returning id`,
      [categoryID]
    );
    // res.send('Data stored successfully!');

    res.redirect("/home.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//TODO how to render selected categories into home.html by chloe
app.get("/selected-category", async (req, res, next) => {
  try {
    let data = await client.query(/*sql*/ `select category from "category"`, [
      req.query.category,
    ]);
    let categories = data.rows;
    res.json(categories);
    console.log(categories);

    // console.log(data);
    // res.render('otherPage',);
  } catch (error) {
    next(error);
  }
});

//TODO BY CHLOE
app.get('/category-result', async (req, res, next) => {
  let userId = 1 //req.session.user_id

  let result = await client.query(`select * from user_category`)

})


// loading tables category and event data pass to frontend
app.get("/category", async (req, res) => {
  try {
    let id = req.query.id;

    let categoryData = (
      await client.query(`SELECT * FROM category WHERE id = $1`, [id])
    ).rows;
    let eventData = (
      await client.query(`SELECT * FROM event WHERE category_id = $1`, [id])
    ).rows;

    let response = {
      categoryData: categoryData,
      eventData: eventData,
    };

    res.json(response);
  } catch (error) {
    console.error("Error retrieving category and event data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

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
