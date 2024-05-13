import express from 'express';
import cors from 'cors'; 
import empresa from './routes/empresa.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).json("{'Server':'ok'}");
})

app.use('/',empresa);

app.listen(3000,()=>{
    let data = new Date();
    console.log(`Sistema inicializado: \nInf:${data}`);
    console.log('http://localhost:3000/');
})