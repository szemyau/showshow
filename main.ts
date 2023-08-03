import express  from 'express'
import {print} from 'listening-on'
import { userRoutes } from './user.routes';
import path from "path";
import { config } from 'dotenv';

let app = express();
app.use(express.urlencoded({ extended: false }))

app.use("/images", express.static("uploads"));
app.use(express.static('public'))
app.use(express.urlencoded())

app.use(userRoutes)


app.get('/', (req, res) =>
res.redirect('/home.html'))

app.get('/select-category', (req, res) =>{
    let category = req.query.category;
    console.log(category) 
    res.redirect('/home.html')
})

// // // learning params, will delete later
// app.get('/select-category/:category', (req, res) => {
//     const selectedCategory = req.params.category;
//     // Handle the selected category as needed
//     res.send(`Selected category: ${selectedCategory}`);
// });

app.get('/signup', (req, res) =>
res.redirect('/signup'))


app.use((req,res) => {
    res.status(404)
    res.sendFile(path.resolve('public', '404.html'))
})

const port = 8000;
app.listen(port, () =>
print(port))