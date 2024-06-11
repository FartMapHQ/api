import { Elysia } from "elysia";
import connector from "./database/connector";
import { Fart } from "./database/models/fart";

new Elysia()
  .get("/", () => ({
    success: true,
    message: "FartMap API is running !"
  }))
  .get("/farts", async (req) => {
    await connector.ensureConnection();
    const farts = await Fart.find();
    return farts;
  })
  .listen(3000);
