import { Router } from 'express';
import {
  login,
  logout,
  signUp,
  getToken,
} from '../controllers/userControllers/index.js';
import { validateUser } from '../middlewares/validateBody.js';

const router = Router();

router.get('/token', getToken);

router.post('/login', login);

router.post('/signup', validateUser, signUp);

router.delete('/logout', logout);

export default router;
