// Buffer Line
import expressSession from "express-session";

declare module "express-session" {
  interface SessionData {
    user_id: number;
    // email: string;
  }
}

export const sessionMiddleware = expressSession({
  secret: "super secret key",
  resave: true,
  saveUninitialized: true,
});
