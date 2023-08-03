import {Router} from 'express'


export let userRoutes = Router()

export type User = {
    id: number
    email: string
    password: string
}

let users: User[] = []
let maxId = users.reduce((id, user) => Math.max(id, user.id), 0)



// sign up
userRoutes.post('/signup', (req, res) => {
    maxId++
    let email = req.body.email
    let password = req.body.password
    users.push({
        id: maxId,
        email: email,
        password: password,
    })
    console.log(users)
    console.log(req.body)
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