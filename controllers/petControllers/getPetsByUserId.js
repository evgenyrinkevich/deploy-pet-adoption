import prisma from '../../db.js';

const getPetsByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const likedPets = await prisma.like.findMany({
      where: {
        userId: id,
      },
      include: {
        pet: true,
      },
    });

    res.json({
      message: 'Pets saved by user',
      pets: likedPets.map((like) => like.pet),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving liked pets' });
  }
};

export default getPetsByUserId;
