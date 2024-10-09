import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/user', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));