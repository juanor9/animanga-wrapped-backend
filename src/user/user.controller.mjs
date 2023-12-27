/* eslint-disable no-unused-vars */
// import crypto from 'crypto';
// import bcrypt from 'bcryptjs';
import { createUser, getUserById } from './user.services.mjs';
import { verifyToken, signToken } from '../auth/auth.services.mjs';

export async function handleCreateUser(req, res) {
  const data = req.body;
  const newUser = data;
  try {
    newUser.isActive = true;
    newUser.role = 'USER';

    // Create user
    const user = await createUser(data);

    // Send verification email
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetUser(req, res) {
  try {
    const userToken = req.headers?.authorization?.split(' ')[1];
    if (!userToken) {
      return res.status(401).json({
        message: 'You are not authorized to access to this information',
      });
    }
    const decoded = verifyToken(userToken);
    return res.status(200).json(decoded);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found to update' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}