import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config(); // to use .env file
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // { notFound, errorHandler
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;
connectDB(); // Connect Database

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});