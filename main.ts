import express, { NextFunction, Request, Response } from "express";

import { print } from "listening-on";
import { userRoutes } from "./routes/user.routes";
import { categoryRoutes } from "./routes/category.routes";
// import path from "path";
// import { client } from "./database";
import { eventRoutes } from "./routes/event.routes";
import { HttpError } from "./http-error";
import { sessionMiddleware } from "./session";
import { createEventRoutes } from "./routes/createEvent.routes";
import { userOnlyAPI } from "./guard";

let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sessionMiddleware);

// app.use((req, res, next) => {
//   console.log({
//     method: req.method,
//     url: req.url,
//     session: req.session,
//   });
//   next();
// });

app.use(express.static("public"));
app.use(userRoutes);
app.use(categoryRoutes);
app.use(createEventRoutes);
app.use(eventRoutes);

app.get("/", (req, res) => res.redirect("/home.html")); // please

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500);
  res.json({ error: String(err) });
});

const port = 8000;
app.listen(port, () => print(port));
