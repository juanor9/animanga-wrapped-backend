import { getUserFilter } from '../../user/user.services.mjs';
import { signToken, handleFailedLogin, handleSuccessfulLogin } from '../auth.services.mjs';

async function handleLogin(
  req,
  res,
) {
  const { email, password } = req.body;

  try {
    const user = await getUserFilter({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isActive !== true) {
      return res.status(401).json({ message: 'User is not active' });
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      await handleFailedLogin(user);
      return res.status(401).json({ message: 'Invalid password' });
    }

    await handleSuccessfulLogin(user);

    const jwtPayload = user.profile;
    const userToken = signToken(jwtPayload);

    return res.status(200).json({
      profile: user.profile,
      userToken,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default handleLogin;
