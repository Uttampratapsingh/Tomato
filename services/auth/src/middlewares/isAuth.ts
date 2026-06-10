import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../model/User.js';

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; 
        if(!decoded || !decoded.user){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded.user; 
        next();
    } catch (error) {
        console.error('Error in isAuth middleware:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
