
import { app } from "./app.js";
import { prisma } from "./config/database.js";
import { env } from "./config/env.js";

const startServer = async (): Promise<void> => {
  try {
    // Step 1: Connect to PostgreSQL
    await prisma.$connect();

    console.info("PostgreSQL connected successfully");

    // Step 2: Start Express only after DB connection
    const server = app.listen(env.PORT, () => {
      console.info(
        `Rabbit Hole API listening on port ${env.PORT}`
      );
    });

    // Step 3: Graceful shutdown
    const shutdown = (signal: string): void => {
      console.info(`${signal} received; shutting down`);

      server.close(() => {
        void prisma.$disconnect().finally(() => {
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (error) {
    console.error("Failed to start Rabbit Hole server:", error);

    await prisma.$disconnect();
    process.exit(1);
  }
};

void startServer(); 