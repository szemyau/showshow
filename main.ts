import express  from 'express'
import {print} from 'listening-on'

let app = express();

app.use("/images", express.static("uploads"));
app.use(express.static('public'))

app.get('/', (req, res) =>
res.redirect('/select-category.html'))

// app.use((req,res) => {
//     res.status(404)
//     res.sendFile(path.resolve('public', '404.html'))
// })
const port = 8000;
app.listen(port, () =>
print(port))