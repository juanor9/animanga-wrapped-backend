import { getUserFilter } from '../../user/user.services.mjs';
import { signToken, handleFailedLogin, handleSuccessfulLogin } from '../auth.services.mjs';
import bcrypt from 'bcryptjs';

async function handleLogin(
  req,
  res,
) {
  const { email, password } = req.body;

  try {
    const user = await getUserFilter({ email });

    // DUMMY HASH: to be used for timing attack prevention
    // It must have the same format of a bcrypt hash
    const DUMMY_HASH = '$2a$10$iE.3s5.a.CGSs4/Ie.s5.OAFx3nANiC.e13rJ8M/25.d3.yspaSpO';
    const passwordToCompare = user ? user.password : DUMMY_HASH;

    const validPassword = await bcrypt.compare(password, passwordToCompare);

    if (!user || !validPassword) {
      if (user) {
        await handleFailedLogin(user);
      }
      return res.status(401).json({ message: 'El correo electrónico o la contraseña son incorrectos' });
    }

    if (user.isActive !== true) {
      return res.status(401).json({ message: 'User is not active' });
    }

    await handleSuccessfulLogin(user);

    const jwtPayload = user.profile;
    const accessToken = signToken(jwtPayload);
    const refreshToken = signRefreshToken(jwtPayload);

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      profile: user.profile,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default handleLogin;
