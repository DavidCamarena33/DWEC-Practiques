import { InsertUser, loginVerify } from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post('/login', loginVerify);

export default router;