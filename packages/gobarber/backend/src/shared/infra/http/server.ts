import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

    console.log(err) // eslint-disable-line

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server executed'); // eslint-disable-line
});
