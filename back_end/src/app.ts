import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import router from './routes/helth.rout.js'

export const app = express();

app.disable('x-powered-by');

app.use('/api', router);

app.use(cors({ origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()) }));

app.use(express.json({ limit: '1mb' }));

app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(notFound);
app.use(errorHandler);
