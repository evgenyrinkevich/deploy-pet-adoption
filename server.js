import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/userRoutes.js';
import petsRouter from './routes/petRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://fs-pet-adoption-fe-evgenyrinkevich.vercel.app',
    'http://pet-adoption-fe.s3-website.eu-central-1.amazonaws.com',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

app.use('/users', usersRouter);
app.use('/pets', petsRouter);

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);
});
