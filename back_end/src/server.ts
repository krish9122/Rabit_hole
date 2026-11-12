import { app } from './app.js';
import { prisma } from './config/database.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.info(`Rabbit Hole API listening on port ${env.PORT}`);
});

const shutdown = (signal: string): void => {
  console.info(`${signal} received; shutting down`);
  server.close(() => {
    void prisma.$disconnect().finally(() => process.exit(0));
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
