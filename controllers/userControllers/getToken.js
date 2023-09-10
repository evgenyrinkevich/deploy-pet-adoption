import jwt from 'jsonwebtoken';
import prisma from '../../db.js';

const getToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const foundUser = await prisma.user.findFirst({
    where: { id: cookies?.userId },
  });

  if (!foundUser) return res.sendStatus(403);

  const newAccessToken = jwt.sign(
    { id: foundUser.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  const newRefreshToken = jwt.sign(
    { id: foundUser.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  await prisma.user.update({
    where: {
      id: foundUser.id,
    },
    data: { refreshToken: newRefreshToken },
  });
  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie('userId', foundUser.id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  const userWithoutPassword = { ...foundUser };
  delete userWithoutPassword.password;
  delete userWithoutPassword.refreshToken;

  return res.json({
    userId: foundUser.id,
    accessToken: newAccessToken,
    user: userWithoutPassword,
  });
};

export default getToken;
