import jwt from 'jsonwebtoken';

// Sign Token
export function signToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: '2h',
    algorithm: 'HS256',
  });

  return token;
}

// Verify Token
export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
    });

    return decoded;
  } catch (error) {
    return false;
  }
}

// isAuthenticated
export function isAuthenticated(
  req,
  res,
  next,
) {
  const userToken = req.headers?.authorization?.split(' ')[1];

  if (!userToken) {
    return res.status(401).json({ message: 'invalid user token' });
  }
  const decoded = verifyToken(userToken);

  if (!decoded) {
    return res.status(401).json({ message: 'token undecoded' });
  }
  console.log('request authorized');
  next();
  return true;
}
