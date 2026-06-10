import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/trycatch.js";


export const getProfile = TryCatch(async(req:AuthenticatedRequest,res)=>{
    console.log("getProfile called")
    if(!req.user){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ user: req.user });
})