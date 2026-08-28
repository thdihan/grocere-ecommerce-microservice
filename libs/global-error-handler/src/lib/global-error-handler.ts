import { Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export const globalErrorHandler = (err: Error, req: Request, res: Response) => {
  console.log(
    '-- [ THIS ERROR LOG IS COMING FROM COMMON ERROR MIDDLEWARE ] --',
  );
  if (err instanceof AppError) {
    console.log(`[ ERROR ] ${req.method} ${req.url} - ${err.message}`);

    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  console.log('Unhandled error:', err);

  return res.status(500).json({
    error: 'Something went wrong, please try again!',
  });
};
