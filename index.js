import express from 'express';
import cors from 'cors';
import connectdb from './config/connectdb.js';
import foodRouter from './routes/foodRoute.js';
import path from 'path'
import 'dotenv/config'
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//app config
const app=express();
const port =4000

//middleware
//app.use(express.json());
app.use(express.json());
app.use(cors());

// database connection
connectdb();

        
// api endpoint
app.use('/api',foodRouter)
app.use('/images', express.static(path.join(__dirname, 'upload')));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter);


app.listen(4000,()=>{
    console.log(`Server is Listening on http://localhost:${port}`);
})


// avdKyHtsGnNqJ8xC
// mongodb+srv://usharanirangapuram:<password>@fooddeliverysite.cum6m9p.mongodb.net/?