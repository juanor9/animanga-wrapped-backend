import healthcheck from './healthcheck/index.mjs';
import user from './user/index.mjs';
import authLocal from './auth/local/index.mjs';
import upload from './upload/cloudinary/index.mjs';
import { checkLockStatus } from './middleware/auth.middleware.mjs';

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/user', user);
  app.use('/api/upload', upload);

  // auth routes
  app.use('/auth/local', checkLockStatus, authLocal);

  // report errors
}

export default routes;
