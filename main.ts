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

// try to insert selected categories into database
app.get('/select-category', async (req, res, next) => {
    try {
        let categoryID = req.query.category
        const selectedIDs = Array.isArray(req.query)
            ? categoryID
            : [categoryID];

        // Perform further processing with the selectedIDs array
        console.log(categoryID);

        let data = await client.query( /*sql*/
            `insert into "category" (category, created_at, updated_at) 
        values ($1, now(), now()) returning id`,
            [categoryID]
        )
        // res.send('Data stored successfully!');

        res.redirect('/home.html');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})

//TODO how to render selected categories into home.html
app.get('/selected-category', async (req, res, next) => {
    try {
        let data = await client.query(/*sql*/
            `select category from "category"`,
            [req.query.category],
        )
        let categories = data.rows
        res.json(categories)
        console.log(categories);

        // console.log(data);
        // res.render('otherPage',);
    } catch (error) {
        next(error)
    }
})

// try to extract req.query

// //let category = req.query.id;
// app.get('/select-category', async (req, res) => {
//     try {
//         let id = req.query.id
//         let selectedIDs = Array.isArray(id)
//             ? id : [id]
//         let data = await client.query(`insert into category id values ($1)`,
//         [selectedIDs])

//         res.redirect('/category.html')
//     } catch (error) {
//         console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
//     }

//     // let category = req.query.id;
//     // console.log(category)
//     // let data = (await client.query(`select * from preference where id = $1`, [id])).rows
//     // res.json(data)
//     // res.json({})
// )

// app.get('/category', (req, res) => {
//     res.render('category',)
// })

// testing using select-category as main page first, then return home.html as the first page 

app.get('/', (req, res) =>
    res.redirect('/select-category.html'))

app.get('/category', async (req, res) => {
    let id = req.query.id
    let data = (await client.query(
        `select * from preference where id = $1`, [id])).rows
    res.json(data)
})

app.use((req, res) => {
    res.status(404)
    res.sendFile(path.resolve('public', '404.html'))
})

const port = 8000;
app.listen(port, () =>
    print(port))
