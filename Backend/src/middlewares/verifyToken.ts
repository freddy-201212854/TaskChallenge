import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '@t0M$?challenge';

const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ code: 401, message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ code: 401, message: 'Sesión expirada' });
  }
};

export default verifyToken;
