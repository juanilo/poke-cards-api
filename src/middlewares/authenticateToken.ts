import { Request, Response, NextFunction } from 'express';
import jwt, {JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.ACCESS_TOKEN_SECRET || '';

if (SECRET === '') {
  console.log('ACCESS_TOKEN_SECRET is not defined');
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET), (error: JsonWebTokenError, user : JwtPayload) => {
    if (error) {
      return res.status(403).send('Access denied');
    }

    req.user = user;
  }

  next();
};

