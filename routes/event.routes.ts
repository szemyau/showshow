import { Router } from "express";
import { client } from "../database";
import { HttpError } from "../http-error";
import { sessionMiddleware } from "../session";
import { userOnlyAPI } from "../guard";

export let eventRoutes = Router();
eventRoutes.use(sessionMiddleware);

// loading tables category and event data pass to frontend
eventRoutes.get("/event-list", userOnlyAPI, async (req, res) => {
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

// event details data
eventRoutes.get("/events/:id", userOnlyAPI, async (req, res, next) => {
  try {
    let event_id = +req.params.id;
    if (!event_id) {
      throw new HttpError(400, "Invalid event_id");
    }
    // extract data from sql, then sent out to front-end
    let result = await client.query(
      /* sql */ `
        select
          about
        from event
        where id = $1
    `,
      [event_id]
    );
    let event = result.rows[0];
    if (!event) {
      throw new HttpError(404, "event not found");
    }
    res.json({ event });
  } catch (error) {
    next(error);
  }
});

// JOIN EVENT
eventRoutes.post("/event-detail/:id", userOnlyAPI, async (req, res, next) => {
  try {
    let user_id = req.session.user_id;
    let event_id = +req.params.id;
    let message = req.body.message;

    console.log({ user_id });
    console.log({ event_id });
    console.log({ message });

    // save join action to database
    let result = await client.query(
      /*sql*/ `
      insert into "participants_events" (user_id, event_id, message, created_at, updated_at) values ($1, $2, $3, now(), now())
      returning id`,
      [user_id, event_id, message]
    );

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
});
