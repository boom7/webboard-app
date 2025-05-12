import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: {
    sub: string;
    username: string;
  };
}
