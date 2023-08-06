import express from 'express'
import { print } from 'listening-on'
import { userRoutes } from './routes/user.routes';
import { categoryRoutes } from './routes/category.routes';
import path from "path";
import { client } from './database';

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

app.get('/category', async (req, res) => {
    try {
        let id = req.query.id;
    
        let categoryData = (await client.query(`SELECT * FROM category WHERE id = $1`, [id])).rows;
        let eventData = (await client.query(`SELECT * FROM event WHERE category_id = $1`, [id])).rows;
    
        let response = {
        categoryData: categoryData,
        eventData: eventData
        };
    
        res.json(response);
    } catch (error) {
        console.error('Error retrieving category and event data:', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});





app.use((req, res) => {
    res.status(404)
    res.sendFile(path.resolve('public', '404.html'))
})

const port = 8000;
app.listen(port, () =>
    print(port))
