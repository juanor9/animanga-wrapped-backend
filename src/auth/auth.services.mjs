import jwt from 'jsonwebtoken';

// The private and public keys are stored in environment variables.
// The '\n' is replaced with actual newline characters.
const privateKey = process.env.PRIVATE_KEY.replace(/\n/g, '\n');
const publicKey = process.env.PUBLIC_KEY.replace(/\n/g, '\n');


const MAX_LOGIN_ATTEMPTS = 5;

// Sign Token
export function signToken(payload) {
  const token = jwt.sign(payload, privateKey, {
    expiresIn: '15m',
    algorithm: 'RS256',
  });

  return token;
}

// Sign Refresh Token
export function signRefreshToken(payload) {
  const token = jwt.sign(payload, privateKey, {
    expiresIn: '7d',
    algorithm: 'RS256',
  });

  return token;
}

// Verify Token
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    });

    return decoded;
  } catch (error) {
    return false;
  }
}

// Verify Refresh Token
export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
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
  next();
  return true;
}

export async function handleFailedLogin(user) {
  const updates = {
    $inc: { failedLoginAttempts: 1 },
    $set: { lastLoginAttempt: new Date() },
  };

  if (user.failedLoginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
    updates.$set.isLocked = true;
  }

  await user.constructor.findByIdAndUpdate(user.id, updates);
}

export async function handleSuccessfulLogin(user) {
  const updates = {
    $set: {
      failedLoginAttempts: 0,
      lastLoginAttempt: null,
      isLocked: false,
    },
  };
  await user.constructor.findByIdAndUpdate(user.id, updates);
}
