import { Router } from "express";
import { client } from "../database";
import formidable from "formidable";
import { toArray, uploadDir } from "../upload";
import { HttpError } from "../http-error";
import crypto from "crypto";

export let createEventRoutes = Router();

createEventRoutes.post("/create-event", (req, res, next) => {
  // set the format of the form inputs
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

      //ensure clients input all fields in the form
      let image = toArray(files.image)[0];
      // console.log(`show image :`, image);

      //here's image's name
      let filename = image?.newFilename;
      console.log(`show filename: `, filename);

      // other inputs will be not showed on the front-end
      let event_category = fields.event_category;

      let event_name = fields.event_name;

      let event_about = fields.event_about;

      let event_date = fields.event_date;

      let event_time = fields.event_time;

      let venue = fields.venue;

      let quota = fields.quota;
      if (
        !event_category ||
        !event_name ||
        !event_name ||
        !event_about ||
        !event_date ||
        !event_time ||
        !venue ||
        !quota
      )
        throw new HttpError(400, "missing content");

      let creator_id = 1; //req.session.user_id

      let result = await client.query(
        /* sql */
        `insert into "event" (name, creator_id, event_date, event_time, venue, quota, 
    created_at, updated_at, about, user_create_event_image, category_id)
      select $1, $2, $3, $4, $5, $6, 
      now(), now(), $7, $8, "category".id 
      from category 
      where "category".name = $9 
      returning id`,

        [
          event_name,
          creator_id,
          event_date,
          event_time,
          venue,
          quota,
          event_about,
          filename,
          event_category,
        ]
      );

      const eventId = result.rows[0].id;

      console.log(`Event inserted with ID: ${eventId}`);

      res.json({}); // Send response after successful database insertion
    } catch (error) {
      next(error);
    }
  });
});
