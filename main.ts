import express  from 'express'
import {print} from 'listening-on'
import { userRoutes } from './user.routes';

let app = express();
app.use(express.urlencoded({ extended: false }))

app.use("/images", express.static("uploads"));
app.use(express.static('public'))
app.use(express.urlencoded())



app.get('/', (req, res) =>
res.redirect('/home.html'))

app.get('/select-category', (req, res) =>
res.redirect('/home.html'))

app.use((req, res, next) => {
  console.log('before using urlencoded', req.url, req.body)
  next()
})

// app.use((req, res, next) => {
//   console.log('after using urlencoded', req.url, req.body)
//   next()
// })

app.get('/signup', (req, res) =>
res.redirect('/signup'))

app.use(userRoutes)

// app.use((req,res) => {
//     res.status(404)
//     res.sendFile(path.resolve('public', '404.html'))
// })


const port = 8000;
app.listen(port, () =>
print(port))