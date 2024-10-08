import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/user', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));