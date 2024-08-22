import { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res) => {
  console.error(err);
  res.status(500).json({ message: err.message ?? 'Internal server error' });
};

export default errorHandlerMiddleware;
