import { Router } from "express";
import { client } from "../database";

export let eventRoutes = Router();

// loading tables category and event data pass to frontend
eventRoutes.get("/event-list", async (req, res) => {
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
  