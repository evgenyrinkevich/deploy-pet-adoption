import prisma from '../../db.js';

const likePet = async (req, res) => {
  try {
    const { id } = req.params;
    const cookies = req.cookies;

    if (!cookies?.userId) return res.sendStatus(401);

    const foundUser = await prisma.user.findFirst({
      where: { id: cookies?.userId },
    });

    // Check if a like with the same userId and petId already exists
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: foundUser.id,
        petId: id,
      },
    });

    if (existingLike) {
      return res.status(400).json({
        message: 'Like already exists for this user and pet.',
      });
    }

    const newLike = await prisma.like.create({
      data: {
        userId: foundUser.id,
        petId: id,
      },
    });

    res.json({
      message: 'Pet saved',
      like: newLike,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'An error occurred while processing your request.',
    });
  }
};

export default likePet;
