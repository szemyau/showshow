import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import expressSession from 'express-session'
import { client } from "./database"
import { UserCollection } from './userCollection';
import {Request, Response} from 'express'
import { checkPassword } from "./hash";




export let userRoutes = Router()

// userRoutes.use(
//     expressSession({
//       secret: 'Tecky Academy teaches typescript',
//       resave: true,
//       saveUninitialized: true,
//     }),
//   )
  
// declare module 'express-session' {
// interface SessionData {
//     user?: {
//     id: number
//     username: string
//     }
// }
// }


export type User = {
    id: number
    email: string
    password: string
}

// sign up
// validation function
const validateRegistration = [
    body('email')
      .isEmail()
      .withMessage('Invalid email address')
      // check email uniqueness
      .custom(async value => {        
        const user:any= await UserCollection.findUserByEmail(value);
        if (user.length>0) {
          throw new Error('Email already registered');
        }
    }),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
      .withMessage(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
     )
];

// save data to database
userRoutes.post('/signup', validateRegistration, async(req:Request, res:Response) => { 
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      console.log(errorMessages);
      return res.status(400).json({ errors: errorMessages });
    }

    let email = req.body.email
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword

    // check confirmPassword is same as password
    if(confirmPassword != password) {
        res.status(400).json("Password not match")
        return
    }

    let result = await client.query(
        /*sql*/`
        insert into "user" (email, password, role, created_at, updated_at) values ($1, $2, $3, now(), now())
        returning id`,
        [email, password, 1],
    );

    const insertedUserId = result.rows[0].id;
   
    console.log(`insertedUserId:`, insertedUserId)
    res.json({})
})




// login
userRoutes.get('/users', (req, res) => {
    res.json(
        // users.map(user => ({
        //     id: user.id,
        //     email: user.email,
        // }))
    )
})