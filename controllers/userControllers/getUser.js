import prisma from '../../db.js';

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return res.json({ message: 'User not found.' });

    res.json({
      message: 'User detail',
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
