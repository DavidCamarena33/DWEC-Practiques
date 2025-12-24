import { GetUsers, InsertUser, loginVerify } from "../controllers/user.controller.js";
import { requireAdmin, verifyToken } from "../middelwares/middelware.js";
import { Router } from "express";

const router = Router();

router.get('/api/users', verifyToken, requireAdmin, GetUsers);
router.post('/api/users', verifyToken, requireAdmin ,InsertUser);

router.post('/login', loginVerify);


export default router;