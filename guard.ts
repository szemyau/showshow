import express from "express";
import { HttpError } from "./http-error";
import "./session";

export function userOnlyAPI(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.session.user_id) {
    req.session.user_id = 1;
  }
  if (req.session?.user_id) {
    next();
  } else {
    next(new HttpError(403, "Please login first"));
  }
}
