import { Router } from "express";
import { client } from "../database";
import { HttpError } from "../http-error";

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

// event details data
eventRoutes.get("/events/:id", async (req, res, next) => {
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
// eventRoutes.post(
//   "/event-detail01",
//   async (req: Request, res: Response) => {
//     try {
//   // retrieve user id from session
//       let req.session.user_id
//   // retrieve event id from params

//   //

//       let message = req.body.message;
//   // save join action to database
//   let result = await client.query(
//   /*sql*/ `
//   insert into "participants_events" (user_id, event_id, message, created_at, updated_at) values ($1, $2, $3, now(), now())
//   returning id`,
//   [user_id, event_id, message]
// );
