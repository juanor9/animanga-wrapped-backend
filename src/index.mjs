import * as dotenv from 'dotenv';
import express from 'express';
import configExpress from './config/express.mjs';
import configDb from './config/database.mjs';
import routes from './routes.mjs';
import ALSourcesProxy from './middleware/anilistResources.mjs';

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();

// Set config file to express
configExpress(app);
// Set config file to Mongo
configDb();
// Set server routes
app.use('/api/al/sources', ALSourcesProxy);

routes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
