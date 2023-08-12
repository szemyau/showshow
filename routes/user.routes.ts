import express, { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { client } from "../database";
import { UserCollection } from "../userCollection";
import { checkPassword, hashPassword } from "../hash";
import bcrypt from "bcrypt";
// import cookieParser from "cookie-parser";

export let userRoutes = Router();

export type User = {
  email: string;
  password: string;
};

//SIGN UP
// server to check the signup details
// validation function by library
const validateRegistration = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    // check email uniqueness
    .custom(async (value) => {
      const user: any = await UserCollection.findUserByEmail(value);
      if (user.length > 0) {
        throw new Error("Email already registered");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
    .withMessage(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
    ),
];

// signup additional validation
userRoutes.post(
  "/signup",
  validateRegistration,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      console.log(errorMessages);
      res.status(400).json({ error: errorMessages[0] });
      return;
    }

    try {
      let email = req.body.email;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;

      // check confirmPassword is same as password
      if (confirmPassword !== password) {
        res.status(400).json({ error: "Password not match" });
        return;
      }

      // validation pass, then hash password
      let hashedPassword = await hashPassword(password);

      // save signup details to database
      let result = await client.query(
        /*sql*/ `
        insert into "user" (email, password, role, created_at, updated_at) values ($1, $2, $3, now(), now())
        returning id`,
        [email, hashedPassword, "member"]
      );

      const insertedUserId = result.rows[0].id;
      console.log(`insertedUserId:`, insertedUserId);
      res.status(200).json({});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// LOGIN
// server to check the login details
userRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log({ email });
  console.log({ password });

  //check if inputemail and pw present
  if (!email) {
    return res.status(400).json({
      error: "Missing email",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: "Missing password",
    });
  }

  // retrieve id and password to database
  let result = await client.query(
    /*sql*/ `
            select password,id from "user" where email = $1`,
    [email]
  );
  console.log({ result });
  // Accessing the returned rows
  let rows = result.rows;
  console.log({ rows });
  // check if email is registered
  if (rows.length == 0) {
    res.status(400).json({ error: "Email not registered" });
    return;
  }

  // check input Password is same as database password
  let passwordMatches = checkPassword(password, rows[0].password);
  if (!passwordMatches) {
    res.status(400).json({ error: "Email or password not match" });
    return;
  }

  // retrieve session details
  req.session.user_id = rows[0].id;
  res.json("login success");
});

// logout
userRoutes.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      console.log("Session destroyed");
    }
  });
  res.send("Logout successful!").redirect("/home.html");
});

userRoutes.get("/role", async (req, res, next) => {
  try {
    let user_id = req.session.user_id;
    console.log(`role: ${user_id}`);
    if (user_id) {
      let result = await client.query(
        /* sql */ `
				select email, role
				from "user"
				where id = $1
			`,
        [user_id]
      );
      let user = result.rows[0];
      console.log(`run user route ts role: ${user}`);
      if (!user) {
        req.session.destroy((err) => {
          if (err) {
            next(err);
          } else {
            res.json({
              role: "member",
            });
          }
        });
        return;
      }
      res.json({});
      //     role: user.is_admin ? 'admin' : 'user',
      //     username: user.username,
      //   })
      // } else {
      //   res.json({
      //     role: 'guest',
      //   })
      // }
    }
  } catch (error) {
    next(error);
  }
});
