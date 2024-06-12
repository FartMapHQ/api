import { Elysia, error, t } from "elysia";
import { jwt } from '@elysiajs/jwt';

import database from "../database";
import authBodySchema from "./schemas/auth";
import jwtSchema from "./schemas/jwt";

import { userFromTokenGetter } from "../plugins/user";

const auth = new Elysia({ prefix: "/auth" })
  .use(jwt({
    secret: process.env.JWT_SECRET!,
    schema: jwtSchema
  }))

  .onError(async ({ code, error }) => {
    if (code === "VALIDATION") {
      return {
        success: false,
        errors: error.all.map((e) => ({ value: e.value, path: e.path, message: e.message }))
      }
    }
  })

  .post("/sign-up", async ({ body: { username, password} }) => {
    await database.ensureConnection();
    const alreadyExistingUser = await database.users.findOne({ username });
    if (alreadyExistingUser) return error(403, {
      success: false,
      errors: [{ value: username, message: "User already exists." }]
    });

    const hashedPassword = await Bun.password.hash(password);
    await database.users.create({ username, password: hashedPassword });

    return { success: true };
  }, { body: authBodySchema })

  .post("/sign-in", async ({ body: { username, password }, jwt: { sign } }) => {
    await database.ensureConnection();
    const user = await database.users.findOne({ username});

    if (!user) return error(404, {
      success: false,
      errors: [{ value: username, message: "User not found." }]
    });

    const passwordMatch = await Bun.password.verify(password, user.password);
    if (!passwordMatch) return error(403, {
      success: false,
      errors: [{ value: password, message: "Incorrect password." }]
    });

    return sign({
      loggedInAt: Date.now(),
      id: user.id
    });
  }, { body: authBodySchema })

  .use(userFromTokenGetter())
  .get("/me", async ({ getUserFromToken }) => {
    const user = await getUserFromToken();
    if (!user) return error(404, {
      success: false,
      errors: [{ message: "Token missing or invalid." }]
    });

    const { password, farts, ...data } = user;
    return { success: true, data };
  });
  

export default auth;
