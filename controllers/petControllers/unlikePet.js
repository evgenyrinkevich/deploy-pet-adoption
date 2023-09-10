import prisma from '../../db.js';

const unlikePet = async (req, res) => {
  try {
    const { id } = req.params;
    const cookies = req.cookies;

    if (!cookies?.userId) return res.sendStatus(401);

    const likeEntry = await prisma.like.findFirst({
      where: {
        userId: cookies.userId,
        petId: id,
      },
    });

    if (likeEntry) {
      await prisma.like.delete({
        where: {
          id: likeEntry.id,
        },
      });

      return res.json({
        message: 'Pet removed from saved',
        pet: { id },
      });
    } else return res.status(404).json({ message: 'Like not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing like' });
  }
};

export default unlikePet;
