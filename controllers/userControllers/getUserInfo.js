import prisma from '../../db.js';

const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Pet: true,
      },
    });

    if (!user) return res.json({ message: 'User not found.' });

    res.json({
      message: 'User info',
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getUserInfo;
