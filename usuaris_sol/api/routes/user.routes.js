import { GetUsers } from "../controllers/user.controller";
import { InsertUser, loginVerify } from "../controllers/auth.controller";
import { requireAdmin, verifyToken } from "../services/middelware.service";
import { Router } from "express";

const router = Router();

router.get('/api/users', verifyToken, requireAdmin, GetUsers);

router.post('/api/users', InsertUser);
router.post('/login', loginVerify);


export default router;