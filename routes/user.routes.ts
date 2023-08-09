import express, { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { client } from "../database";
import { UserCollection } from "../userCollection";
import { checkPassword, hashPassword } from "../hash";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

export let userRoutes = Router();

// Set up middlewares
//userRoutes.use(express.urlencoded({ extended: true }));
//userRoutes.use(cookieParser());
// userRoutes.use(
//   expressSession({
//     secret: "super secret key",
//     resave: false,
//     saveUninitialized: true,
//     //cookie: { secure: true },
//   })
// );

export type User = {
  id: number;
  email: string;
  // passwordHash: string;
};

// sign up
// validation function
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

// save data to database
userRoutes.post(
  "/signup",
  validateRegistration,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      console.log(errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    try {
      let email = req.body.email;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;

      // check confirmPassword is same as password
      if (confirmPassword != password) {
        res.status(400).json("Password not match");
        return;
      }

      let result = await client.query(
        /*sql*/ `
        insert into "user" (email, password, role, created_at, updated_at) values ($1, $2, $3, now(), now())
        returning id`,
        [email, password, "member"]
      );

      const insertedUserId = result.rows[0].id;

      console.log(`insertedUserId:`, insertedUserId);
      res.json({ message: "Registration successful" });
      res.status(200);
      console.log({ result });
      console.log(typeof result);
      console.log(res.status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// login
userRoutes.get("/login", (req, res) => {
  // if (req.session.user) {
  //   console.log(req.session.user);
  //   // res.send(`Welcome back, ${req.session.user.name}!`);
  //   res.send(`Welcome back, !`);
  // } else {
  //   res.send("Welcome to our website!");
  // }
});

// userRoutes.get("/", (req: Request, res: Response) => {
//   res.send(`
//     <form method="post" action="/login">
//       <input type="email" name="email" placeholder="Email">
//       <input type="password" name="password" placeholder="Password">
//       <button type="submit">Login</button>
//     </form>
//   `);
// });

const users: User[] = [
  {
    id: 1,
    email: "user1@example.com",
    passwordHash:
      "$2b$10$7tA9k5BJaBt5rK6xHkRjhe4oZ2V.GlyCcX0gqvWx3f3jIc7WdK4MO", // hashed password: 'password'
  },
  {
    id: 2,
    email: "user2@example.com",
    passwordHash:
      "$2b$10$7tA9k5BJaBt5rK6xHkRjhe4oZ2V.GlyCcX0gqvWx3f3jIc7WdK4MO", // hashed password: 'password'
  },
];

userRoutes.post("/login", async (req: Request, res: Response) => {
  // Validate user credentials
  // const user = { id: 123, email: "John@gmail.com", passwordHash: '$2b$10$7tA9k5BJaBt5rK6xHkRjhe4oZ2V.GlyCcX0gqvWx3f3jIc7WdK4MO' };
  // req.session.user = User;

  /*  Validation */
  /*  success 
  req.session.user_id = // id here
  */
  const { id, email, password } = req.body;
  const user = users.find((u) => u.id === id && u.email === email);
  console.log({ user });

  if (!user) {
    res.status(401).send("Invalid email or password");
    return;
  }

  /* get user info from db */

  const passwordMatches = await bcrypt.compare(password, ""); //user.passwordHash);

  if (passwordMatches) {
    req.session.user_id = -1; //user.id;
    res.cookie("sessionId", req.session.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid email or password");
  }
  //res.send("Login successful!");
});

userRoutes.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      console.log("Session destroyed");
    }
  });
  res.send("Logout successful!");
});
