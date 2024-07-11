import { NextFunction, Request, Response } from 'express';

//error handdler
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error();
  error.name = 'not-found';
  error.message = 'Route not found!';
  next(error);
};
