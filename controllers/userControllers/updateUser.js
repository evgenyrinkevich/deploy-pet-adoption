import prisma from '../../db.js';
import bcrypt from 'bcrypt';

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...req.body, password: hashedPassword, id },
    });

    res.json({ message: 'user updated', user: updatedUser });
  } catch (error) {
    console.log(error);
  }
};

export default updateUser;
