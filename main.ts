import express from 'express'
import { print } from 'listening-on'
import { userRoutes } from './user.routes';
import { categoryRoutes } from './routes/category.routes';
import path from "path";

let app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/images", express.static("uploads"));
app.use(express.static('public'))
app.use(userRoutes)
app.use(categoryRoutes)

app.get('/select-category', (req, res) => {
    let category = req.query.category;
    console.log(category)
    res.redirect('/home.html')
})

app.get('/', (req, res) =>
    res.redirect('/home.html'))


app.get('/signup', (req, res) =>
    res.redirect('/signup'))

app.use((req, res) => {
    res.status(404)
    res.sendFile(path.resolve('public', '404.html'))
})

const port = 8000;
app.listen(port, () =>
    print(port))
