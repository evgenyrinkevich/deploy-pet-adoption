import prisma from '../../db.js';

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Pet: true,
      },
    });
    res.json({
      message: 'List of users',
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getUsers;
