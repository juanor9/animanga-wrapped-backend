import { getUserFilter } from '../user/user.services.mjs';

const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

export async function checkLockStatus(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  try {
    const user = await getUserFilter({ email });

    if (user && user.isLocked && user.lastLoginAttempt && (new Date() - user.lastLoginAttempt < LOCK_TIME)) {
      return res.status(401).json({ message: 'Account locked. Try again later.' });
    }

    if (user && user.isLocked && user.lastLoginAttempt && (new Date() - user.lastLoginAttempt > LOCK_TIME)) {
      user.isLocked = false;
      user.failedLoginAttempts = 0;
      await user.save();
    }

    next();
  } catch (error) {
    return res.status(500).json(error);
  }
  return true;
}
