import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../db.js';

const signUp = async (req, res) => {
  try {
    const uuid = uuidv4();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
      data: { ...req.body, password: hashedPassword, id: uuid },
    });

    res.status(201).json({
      message: 'User created',
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export default signUp;
