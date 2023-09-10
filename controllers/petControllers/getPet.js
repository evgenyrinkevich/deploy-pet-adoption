import prisma from '../../db.js';

const getPet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    if (!pet) return res.json({ message: 'Pet not found.' });

    res.json({
      message: 'Pet detail',
      pet: pet,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getPet;
