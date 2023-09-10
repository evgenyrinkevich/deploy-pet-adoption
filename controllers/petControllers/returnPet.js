import prisma from '../../db.js';

const returnPet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = await prisma.pet.update({
      where: { id },
      data: {
        adoptionStatus: 'Available',
        ownerId: null,
      },
    });

    res.json({
      message: 'Pet is available',
      pet: updatedPet,
    });
  } catch (error) {
    console.log(error);
  }
};

export default returnPet;
