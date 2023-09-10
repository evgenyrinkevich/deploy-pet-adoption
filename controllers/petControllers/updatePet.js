import prisma from '../../db.js';

const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = await prisma.pet.update({
      where: { id },
      data: { ...req.body, picture: req.file?.path },
    });

    res.json({ message: 'Pet updated', pet: updatedPet });
  } catch (error) {
    console.log(error);
  }
};

export default updatePet;
