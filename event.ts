import { Router } from "express";
import { client } from "./database";
import { HttpError } from "./http-error";

export let eventRoutes = Router();

eventRoutes.get("/events/:id", async (req, res, next) => {
  try {
    let event_id = +req.params.id;
    if (!event_id) {
      throw new HttpError(400, "Invalid event_id");
    }
    // extract data from sql, then sent out to font-end
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
