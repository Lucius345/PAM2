import express from 'express';
import cors from 'cors'; 
import filmes from './routes/filmes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).json("{'Server':'ok'}");
})

app.use('/',filmes);

app.listen(8001,()=>{
    let data = new Date();
    console.log(`Sistema inicializado: \nInf:${data}`);
    console.log('http://localhost:8001/');
})