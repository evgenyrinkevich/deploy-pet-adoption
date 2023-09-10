import prisma from '../../db.js';

const adoptPet = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    const foundUser = await prisma.user.findFirst({
      where: { id: cookies?.userId },
    });
    const { id } = req.params;
    const { adoptionStatus } = req.body;

    const existingPet = await prisma.pet.findUnique({
      where: { id },
    });

    if (!existingPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (existingPet.ownerId && existingPet.ownerId !== foundUser.id) {
      return res
        .status(403)
        .json({ message: "Cannot adopt/foster someone else's pet" });
    }

    const updatedPet = await prisma.pet.update({
      where: { id },
      data: {
        adoptionStatus,
        ownerId: foundUser.id,
      },
    });

    res.json({
      message: `Pet status is ${adoptionStatus}`,
      pet: updatedPet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default adoptPet;
