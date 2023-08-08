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

    let response: any = [];

    for (let data of eventData) {
      // calculate vacancy
      let eventVacancyData = (
        await client.query(
          `SELECT COUNT(*) FROM participants_events WHERE event_id = $1`,
          [data.id]
        )
      ).rows;
      let eventQuotaData = [data.quota];

      // check status logic
      let eventDate = new Date(data.event_date);
      let today = new Date();
      let status: string;

      if (eventDate < today) {
        status = "expired";
      } else {
        status = "active";
      }
      console.log({ status });

      data["vacancy"] = eventQuotaData[0] - eventVacancyData[0].count;
      data["status"] = status;

      response.push(data);
    }

    console.log(response);

    res.json(response);
  } catch (error) {
    console.error("Error retrieving category and event data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});
