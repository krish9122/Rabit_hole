# Rabbit Hole Backend

Initial TypeScript/Express backend foundation for Rabbit Hole. This is a modular monolith starter; product modules are intentionally unimplemented.

## Requirements

- Node.js 20 or newer and npm
- PostgreSQL running locally or remotely

## Setup

1. Install packages with `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string. Set `CORS_ORIGIN` to the frontend origin (comma-separated origins are accepted). `PORT` and `NODE_ENV` have defaults.
3. Create the named PostgreSQL database, then run `npm run db:generate`.
4. Start the API with `npm run dev`; check `GET http://localhost:3000/api/v1/health`.

The initial Prisma schema has no domain models, so there is no migration to apply yet. Once models are added, use `npm run db:migrate` in development. Never commit `.env` or production credentials.

## Scripts

- `npm run dev` — run the server with reload
- `npm run build` — compile strict TypeScript into `dist/`
- `npm start` — run the compiled server
- `npm test` / `npm run test:watch` — run/watch Vitest
- `npm run db:generate` — generate Prisma Client
- `npm run db:validate` — validate Prisma schema
- `npm run db:migrate` — create/apply a development migration
