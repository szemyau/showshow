import express  from 'express'
import {print} from 'listening-on'
import { userRoutes } from './user.routes';
import path from "path";

// import jsonfile from jsonfile;



let app = express();
app.use(express.urlencoded({ extended: false }))

app.use("/images", express.static("uploads"));
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(userRoutes)


// type User = {
//     email: string,
//     password: string,
//     role: number,
// }

// let userParser = object({
//     email: string(),
//     password: string(),
//     role: number(),
//   })

// async function main() {
//     const client = new Client({
//         database: env.DB_NAME,
//         user: env.DB_USERNAME,
//         password: env.DB_PASSWORD,
//     }) 

//     await client.connect()
    
//     // for(let object of userArray){
//     //     let user = userParser.parse(object)
//     // }

//     let tableValue = await client.query(
//         /*sql*/`
//         insert into users (email, password, role) values ('hi', 1234, 1),('bye', 1234, 2)`
//     )

//     await client.end()
// }

// main().catch(e => console.error(e))

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



// app.use((req,res) => {
//     res.status(404)
//     res.sendFile(path.resolve('public', '404.html'))
// })
app.get('/signup', (req, res) =>
res.redirect('/signup'))

app.use((req,res) => {

    res.status(404)
    res.sendFile(path.resolve('public', '404.html'))
})

const port = 8000;
app.listen(port, () =>
print(port))

// // // learning params, will delete later
// app.get('/select-category/:category', (req, res) => {
//     const selectedCategory = req.params.category;
//     // Handle the selected category as needed
//     res.send(`Selected category: ${selectedCategory}`);
// });