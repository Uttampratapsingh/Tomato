import express from "express";
import { loginUser } from "../controller/auth.js";
import { addUserRole } from "../controller/addUserRole.js";
import { isAuth } from "../middlewares/isAuth.js";

const authRoutes = express.Router();

authRoutes.post("/login",loginUser);
authRoutes.put("/add/role",isAuth,addUserRole);

export default authRoutes;