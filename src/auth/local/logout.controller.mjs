import { getUserFilter } from '../../user/user.services.mjs';

async function handleLogout(req, res) {
  const { email } = req.body;

  try {
    const user = await getUserFilter({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    user.refreshToken = null;
    await user.save();

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default handleLogout;