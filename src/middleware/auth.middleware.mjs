import { getUserFilter } from '../user/user.services.mjs';

const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

async function checkLockStatus(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  try {
    const user = await getUserFilter({ email });

    if (user && user.isLocked && user.lastLoginAttempt) {
      const timeSinceLastLogin = new Date() - user.lastLoginAttempt;
      if (timeSinceLastLogin < LOCK_TIME) {
        return res.status(401).json({ message: 'Account locked. Try again later.' });
      }
      if (timeSinceLastLogin > LOCK_TIME) {
        await user.constructor.findByIdAndUpdate(user.id, {
          $set: {
            isLocked: false,
            failedLoginAttempts: 0,
          },
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json(error);
  }
  return true;
}

export default checkLockStatus;
