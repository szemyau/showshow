import express  from 'express'
import {print} from 'listening-on'

let app = express();

app.use("/images", express.static("uploads"));
app.use(express.static('public'))

app.get('/', (req, res) =>
res.redirect('/category.html'))


const port = 8000;
app.listen(port, () =>
print(port))