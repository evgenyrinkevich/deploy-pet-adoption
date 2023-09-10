import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../db.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user == null) {
    return res.status(400).json({ message: 'Cannot find user' });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie('userId', user.id, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        message: 'User logged in',
        accessToken,
        user,
        userId: user.id,
      });
    } else {
      res.status(403).json({ message: 'Not allowed.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default login;
