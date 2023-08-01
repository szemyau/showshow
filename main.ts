import express  from 'express'
import {print} from 'listening-on'

let app = express();

app.use(express.static('public'))

app.get('/', (req, res) =>
res.redirect('/preference.html'))

const port = 8000;
app.listen(port, () =>
print(port))