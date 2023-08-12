import { Router } from "express";
import { client } from "../database";
import formidable from "formidable";
import { toArray, uploadDir } from "../upload";
import { HttpError } from "../http-error";
import crypto from "crypto";

export let createEventRoutes = Router();

// show event profile on event-profile.html
createEventRoutes.get("/create-event", async (req, res, next) => {
  try {
    let result = await client.query(
      /* sql */ `
  --select name, creator_id, updated_at, event_date, event_time, venue, about from table 'event'; 
  --still need to select email from table 'user' with fk 'creator_id'
  select
  creator_id,
  name,
  updated_at,
  event_date,
  event_time,
  venue,
  about
  from event;
  `,
      [req.session.user_id]
    );
    let eventProfile = result.rows;
    res.json({ eventProfile });
  } catch (error) {}
});
