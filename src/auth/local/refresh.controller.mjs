import { verifyRefreshToken } from '../auth.services.mjs';
import { getUserFilter } from '../../user/user.services.mjs';
import { signToken } from '../auth.services.mjs';

async function handleRefresh(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await getUserFilter({ _id: decoded._id });

  if (!user || user.refreshToken !== refreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const accessToken = signToken(user.profile);

  return res.status(200).json({ accessToken });
}

export default handleRefresh;
