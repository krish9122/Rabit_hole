import {prisma} from "../lib/prisma.js"

async function main() {
    try {
        await prisma.$connect();

        console.log("PostgreSQL connected successfully!");

        const result = await prisma.$queryRaw`SELECT 1`;

        console.log("Database test:", result);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exitCode = 1;
    } finally {
        await prisma.$disconnect();
    }
}

main();