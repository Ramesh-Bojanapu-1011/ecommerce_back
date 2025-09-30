import db_connect from './config/dbconnect.js';
import express from 'express';
import authRouter from './routes/authroute.js';
import productRouter from './routes/projuctroute.js';
import blogRouter from './routes/blogroute.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors middleware

import cookie_parser from 'cookie-parser';
import { not_found, error_handler } from './middlewares/errorhandler.js';
import moragan from 'morgan';
import dotenv from 'dotenv';

/* Loading environment variables from .env file */
dotenv.config();

db_connect();
const app = express();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// Enable CORS for all origins. In production, replace * with the origins
// that need to be allowed to access your API.
const corsOptions = {
  origin: '*', // Or: ['http://localhost:3000', 'https://example.com']
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(moragan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie_parser());

/* setting up routes in the Express application. */
app.use('/api/user/', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

/* are setting up middleware functions in the Express application. */
app.use(not_found);
app.use(error_handler);
