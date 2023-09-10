import { Router } from 'express';
import {
  getUser,
  getUsers,
  getUserInfo,
  updateUser,
} from '../controllers/userControllers/index.js';
import { validateUser } from '../middlewares/validateBody.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.use(verifyToken);

router.get('/', getUsers);

router.get('/:id', getUser);

router.put('/:id', validateUser, updateUser);

router.get('/:id/full', getUserInfo);

export default router;
