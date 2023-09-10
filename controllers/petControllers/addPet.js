import { v4 as uuidv4 } from 'uuid';
import prisma from '../../db.js';

const DEFAULT_IMAGE_URL =
  'https://res.cloudinary.com/dz5d0s3q1/image/upload/v1693729116/pet-adoption/cio6hof32pdeecge3myg.png';

const addPet = async (req, res) => {
  try {
    const uuid = uuidv4();
    const newPet = await prisma.pet.create({
      data: {
        ...req.body,
        id: uuid,
        picture: req.file?.path || DEFAULT_IMAGE_URL,
      },
    });

    res.json({ message: 'Pet added', pet: newPet });
  } catch (error) {
    console.log(error);
  }
};

export default addPet;
