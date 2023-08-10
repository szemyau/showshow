import { Router } from "express";
import { client } from "../database";
import formidable from "formidable";
import { toArray, uploadDir } from "../upload";
import { HttpError } from "../http-error";
import crypto from "crypto";

export let createEventRoutes = Router();

// createEventRoutes.post("/create-event", async (req, res, next) => {
//   try {
//     client.query(
//       /* sql */
//       `select name, user_create_event_image from event where creator_id=1`
//     );
//   } catch (error) {}
//   res.json({});
// });

createEventRoutes.post("/create-event", (req, res, next) => {
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
      // console.log(req.body);
      // console.log({ err, fields, files });
      console.log({ fields, files });

      if (err) throw new HttpError(400, String(err));

      //ensure clients input all fields in the form
      let image = toArray(files.image)[0];
      let filename = image?.newFilename;

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
      res.json({});
      // Rest of the code remains the same...
      // Insert into database, send response, emit socket.io event, etc.
    } catch (error) {
      next(error);
    }
  });
});
// createEventRoutes.post("/create-event", (req, res, next)=> {
//     let form = formidable({
//         uploadDir,

//     })
// })
