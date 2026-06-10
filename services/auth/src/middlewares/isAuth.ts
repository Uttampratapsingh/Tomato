import {Request, Response, NextFunction} from 'express'; //Used for Express typing.
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../model/User.js'; //our user interface.

export interface AuthenticatedRequest extends Request { //Normally Express Request looks like: req.body, req.params. there is no req.user by default. So we are extending the Request interface to include a user property that can hold the authenticated user's information.
    user?: IUser | null; //Without this req.user = user; ❌ Error
}

export const isAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    
    try {
        const authHeader = req.headers.authorization; //Reading Authorization Header
        if (!authHeader || !authHeader.startsWith('Bearer ')) { //Checking if the header is present and starts with 'Bearer '. If not, it means the client hasn't provided a valid token, so we return a 401 Unauthorized response.
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1]; //Extracting the token from the header. The header is in the format 'Bearer <token>', so we split it by space and take the second part which is the actual token.
        if(!token){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; 
        if(!decoded || !decoded.user){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded.user; //Attaching the decoded user information to the request object. This allows downstream middleware and route handlers to access the authenticated user's information via req.user.
        next();
    } catch (error) {
        console.error('Error in isAuth middleware:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
