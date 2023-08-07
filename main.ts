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

// insert selected categories into database table 'category'

// based on selected categories, then insert them into database
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
app.get("/category-result", async (req, res, next) => {
  let userId = 1; //req.session.user_id

  let result = await client.query(`select * from user_category`);
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
