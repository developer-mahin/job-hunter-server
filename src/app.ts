/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import notFound from './middlewares/nof-found';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    // origin: 'https://jobhunterclient.vercel.app',
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

// all routes are control in here
app.use('/api/v1', router);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Welcome To The Job Hunter Server',
  });
});

// API not found middleware
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
