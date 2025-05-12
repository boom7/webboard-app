import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Authorization' header

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authorization token is missing' });
    }
    try {
      const decoded = jwt.verify(token, 'your-secret-key');

      req.user = decoded;
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
