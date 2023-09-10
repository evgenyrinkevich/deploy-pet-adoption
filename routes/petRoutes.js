import { Router } from 'express';
import {
  getPets,
  getPet,
  updatePet,
  adoptPet,
  returnPet,
  likePet,
  unlikePet,
  getPetsByUserId,
  addPet,
} from '../controllers/petControllers/index.js';
import { validatePet } from '../middlewares/validateBody.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../middlewares/processImage.js';

const router = Router();

router.get('/', getPets);

router.get('/:id', getPet);

router.put(
  '/:id',
  verifyToken,
  upload.single('picture'),
  validatePet,
  updatePet
);

router.post('/:id/adopt', verifyToken, adoptPet);

router.post('/:id/return', verifyToken, returnPet);

router.post('/:id/save', verifyToken, likePet);

router.delete('/:id/unsave', verifyToken, unlikePet);

router.get('/user/:id', verifyToken, getPetsByUserId);

router.post('/', upload.single('picture'), verifyToken, validatePet, addPet);

export default router;
