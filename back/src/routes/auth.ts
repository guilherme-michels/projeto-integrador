import express from 'express';

import AuthController from '../controllers/authController';
import Middleware from '../middleware';
const authController = new AuthController();

const router = express.Router();

router.post('/login', authController.store);
router.get('/persons/me', Middleware.validateToken, authController.show);

export { router as authRouter };
