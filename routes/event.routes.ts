import { Router } from "express";
import { client } from "../database";
import { HttpError } from "../http-error";
import formidable from "formidable";
import { toArray, uploadDir } from "../upload";
import crypto from "crypto";
import { id, object, string } from "cast.ts";
import { userOnlyAPI } from "../guard";

export let eventRoutes = Router();

/* BEGIN used by create-event.html by chloe */

// build up category's choices in create event form
eventRoutes.get("/categories", async (req, res, next) => {
  try {
    let result = await client.query(
      /* sql */ `
    select
      category.id
    , category.name
    from category
      `,
      []
    );
    let categories = result.rows;
    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

let createEventParser = object({
  fields: object({
    event_category: id(),
    event_name: string(),
    event_about: string(),
    event_date: string(),
    event_time: string(),
    venue: string(),
    quota: string(),
    contact: string(),
  }),
});

// submit event form
eventRoutes.post("/events", userOnlyAPI, (req, res, next) => {
  let form = formidable({
    uploadDir,
    allowEmptyFiles: false,
    filter(part) {
      return part.mimetype?.startsWith("image/") || false;
    },
    filename(name, ext, part, form) {
      return crypto.randomUUID() + "." + part.mimetype?.split("/").pop();
    },
  });
  form.parse(req, async (err, fields, files) => {
    try {
      // console.log({ fields, files });

      if (err) throw new HttpError(400, String(err));

      let input = createEventParser.parse({ files, fields });

      //ensure clients input all fields in the form
      let image = toArray(files.image)[0];
      // console.log(`show image :`, image);

      //here's image's name
      let filename = image?.newFilename;
      console.log(`show filename: `, filename);

      // other inputs will be not showed on the front-end

      let result = await client.query(
        /* sql */ `
        insert into "event" 
        (name, creator_id, event_date, event_time, venue, quota, created_at, updated_at, about, user_create_event_image, category_id, contact)
        values
        ($1,   $2,         $3,         $4,         $5,    $6,    CURRENT_TIMESTAMP,null, $7,    $8,                      $9,          $10)
        returning id
`,
        [
          input.fields.event_name,
          req.session.user_id,
          input.fields.event_date,
          input.fields.event_time,
          input.fields.venue,
          input.fields.quota,
          input.fields.event_about,
          filename,
          input.fields.event_category,
          input.fields.contact,
        ]
      );

      const event_id = result.rows[0].id;

      console.log(`Event inserted with ID: ${event_id}`);

      res.json({ event_id }); // Send response after successful database insertion
    } catch (error) {
      next(error);
    }
  });
});

/* END used by create-event.html by chloe */

/* BEGIN used by event-profile.html by chloe */

eventRoutes.get("/events/by-me", userOnlyAPI, async (req, res, next) => {
  try {
    let result = await client.query(
      /* sql */ `
select
  event.id
, event.event_date
, event.event_time
, event.name
, event.venue
, event.contact
, event.created_at
, creator.email as creator_email
, event.contact

from event
inner join "user" as creator on creator.id = event.creator_id
where event.creator_id = $1
order by event.id desc
    `,
      [req.session.user_id]
    );
    let events = result.rows;
    res.json({ events });
  } catch (error) {
    next(error);
  }
});

/* END used by event-profile.html by chloe */

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
    let user_id = req.session.user_id;

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

    // disable the join button if user joined already
    console.log(`load into event details page and check joined or not`);

    let joined = await client.query(
      /* sql */ `
    select
      id
    from participants_events
    where user_id = $1 and event_id = $2
`,
      [user_id, event_id]
    );
    let isJoined = joined.rows[0];
    console.log(`participants_events: { isJoined }`);

    let event = result.rows[0];
    if (!event) {
      throw new HttpError(404, "event not found");
    }
    res.json({ isJoined, event });
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
    console.log(`going to save join details to database`);

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
