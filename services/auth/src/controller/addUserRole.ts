import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/trycatch.js";
import User from "../model/User.js";
import { Response } from "express";
import jwt from "jsonwebtoken";




const allowedRoles = ['customer', 'rider', 'seller'] as const;
type Role = typeof allowedRoles[number]; // This creates a type Role that can only be one of the values in allowedRoles.

export const addUserRole = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    if(!req.user?._id){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { role } = req.body as { role: Role };

    if(!allowedRoles.includes(role)){
        return res.status(400).json({ message: `Role must be one of: ${allowedRoles.join(', ')}` });
    }

    if (!role || !allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Role is required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.role = role as Role; // Type assertion to ensure role is of type Role
    await user.save();

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: '2D' }); 

    res.status(200).json({ message: 'User role updated successfully', user, token });
});