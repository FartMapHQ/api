import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

import database from "./database";
import { Fart } from "./database/models/fart";

import auth from "./routers/auth";

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined !");
  process.exit(1);
}

new Elysia()
  .use(swagger())
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

  .listen(3000);
