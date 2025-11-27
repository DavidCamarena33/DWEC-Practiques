import { GetUsers } from "../controllers/user.controller.js";
import { InsertUser } from "../controllers/auth.controller.js";
import { requireAdmin, verifyToken } from "../services/middelware.service.js";
import { Router } from "express";

const router = Router();

router.get('/', verifyToken, requireAdmin, GetUsers);

router.post('/', InsertUser);


export default router;