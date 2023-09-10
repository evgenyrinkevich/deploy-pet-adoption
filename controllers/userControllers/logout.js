import jwt from 'jsonwebtoken';
import prisma from '../../db.js';

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await prisma.user.findFirst({
    where: { refreshToken },
  });

  if (!foundUser || Object.keys(foundUser).length === 0) {
    res.clearCookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(204).json({ message: 'User logged out.' });
  }

  await prisma.user.update({
    where: {
      email: foundUser.email,
    },
    data: {
      refreshToken: null,
    },
  });

  res.clearCookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.clearCookie('userId', foundUser?.id, {
    httpOnly: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.sendStatus(204);
};

export default logout;
