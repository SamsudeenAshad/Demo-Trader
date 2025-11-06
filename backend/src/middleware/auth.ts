import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'No authentication token, access denied' });
      return;
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Add user ID to request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
