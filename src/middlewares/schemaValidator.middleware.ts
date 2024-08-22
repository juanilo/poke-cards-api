import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const schemaValidation = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues.map((issue) => ({ field: issue.path.at(0), error: issue.message })));
    }
    return res.status(400).json({ error });
  }
};
