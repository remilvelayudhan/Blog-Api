const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT ;

//require (./db);


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World! welcom to blg api')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})