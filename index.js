const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./Routes/UserRouter');
const blogRouter = require('./Routes/BlogRouter')

require('dotenv').config();

const PORT = process.env.PORT ;

require ('./db');


app.use(cors());
app.use(bodyParser.json());
app.use('/users',userRouter) ;
//app.use('/blog',blogRouter)

app.use('/create',(req,res)=>{
    console.log(req.body);
    res.send('Hello')
;    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})