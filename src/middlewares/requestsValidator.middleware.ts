import { Request, Response, NextFunction } from 'express';

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Invalid request body' });
  }
  next();
};

export const validateRequestIdParam = (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Invalid request id param' });
  }
  next();
};
