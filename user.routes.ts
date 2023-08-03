import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import expressSession from 'express-session'


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

let users: User[] = []
let maxId = users.reduce((id, user) => Math.max(id, user.id), 0)



// sign up
// validation
const validateRegistration = [
    body('email')
      .isEmail()
      .withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
      .withMessage(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
      ),
];

// send data to server
userRoutes.post('/signup', validateRegistration, (req:any, res:any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

// Registration logic if validation passes
    maxId++
    let email = req.body.email
    let password = req.body.password

    users.push({
        id: maxId,
        email: email,
        password: password,
    })
    console.log(`users:`, users)
    console.log(`request body:`, req.body)
    res.json({})
})


// login
userRoutes.get('/users', (req, res) => {
    res.json(
        users.map(user => ({
            id: user.id,
            email: user.email,
        }))
    )
})