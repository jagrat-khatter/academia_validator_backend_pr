import express from 'express'
import  type {Request  , Response , NextFunction } from 'express'
import cors from 'cors'
import {class12_router} from './routes/cbse_class12'



const app = express();
app.use(cors());
app.use(express.json());

app.use('/cbseclass12' , class12_router);

app.listen(3000 , ()=>{
    console.log("Listening on port 3000")
})