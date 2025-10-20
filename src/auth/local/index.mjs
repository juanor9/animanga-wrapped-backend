import { Router } from 'express';
import handleLogin from './local.controller.mjs';
import handleRefresh from './refresh.controller.mjs';
import handleLogout from './logout.controller.mjs';

const router = Router();

// Login
// auth/local/login
router.post('/login', handleLogin);

// Refresh
// auth/local/refresh
router.post('/refresh', handleRefresh);

// Logout
// auth/local/logout
router.post('/logout', handleLogout);

export default router;
