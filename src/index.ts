import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

import database from "./database";
import { Fart } from "./database/models/fart";

import auth from "./routers/auth";

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined !");
  process.exit(1);
}

// TODO: Make this configurable.
const PORT = 8024;

new Elysia()
  .use(swagger({
    documentation: {
      info: {
          title: 'FartMap API Documentation',
          version: (await Bun.file('package.json').json()).version,
      }
    }
  }))
  .use(auth)
  .get("/", () => ({
    success: true,
    message: "FartMap API is running !"
  }))
  

  .get("/farts", async (req) => {
    await database.ensureConnection();
    const farts = await Fart.find();
    return farts;
  })

  .listen(PORT, () => {
    console.log(`[listen] running on port ${PORT}`);
  });
