import { Router } from "express";
import { client } from "../database";
import { userOnlyAPI } from "../guard";

export let categoryRoutes = Router();

// select image
//show category list on category-list.html by chloe
categoryRoutes.get("/category-list", userOnlyAPI, async (req, res, next) => {
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

// category-list.html: insert selected categories into database table 'category' by chloe
categoryRoutes.get("/category-result", async (req, res, next) => {
  try {
    // let userID = 1; //req.session.user_id
    let userID = req.session.user_id;
    console.log(`userid-choice:`, userID);

    //let categoryIdArray = req.query?.category as string[]||[];

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
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// generate users'categories on home.html by chloe
categoryRoutes.get("/userCategoryList", async (req, res, next) => {
  try {
    // let userID = 1; //req.session.user_id
    let userID = req.session.user_id;
    // console.log(`userid:`, userID);

    let result = await client.query(
      /* sql */ `
      select category.id, user_image,name  
      from category 
      left join (select * from users_categories  where user_id=$1) user_category 
      on user_category.category_id = category.id where user_id notnull`,
      [userID]
    );

    let userCategoryChoices = result.rows;

    let anotherResult = await client.query(
      /* sql */ `
        select category.id, user_image,name 
        from category 
        left join (select * from users_categories  where user_id=$1) user_category 
        on user_category.category_id = category.id where user_id is null`,
      [userID]
    );

    let anotherCategoryChoices = anotherResult.rows;
    // console.log({ userCategoryChoices, anotherCategoryChoices });

    res.json({ userCategoryChoices, anotherCategoryChoices });
  } catch (error) {
    next(error);
  }
});
