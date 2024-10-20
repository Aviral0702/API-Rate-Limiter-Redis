import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbconfig.js';
import userRoutes from './routes/apiRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('API is running...');
})

app.use('/api/user',userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})