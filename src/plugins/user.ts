import { Elysia } from "elysia";
import type { User } from "../database/models/user";
import jwt from "@elysiajs/jwt";
import jwtSchema from "../routers/schemas/jwt";
import database from "../database";

/**
 * Plugin that allows to get the user from the bearer token.
 * Verify the token, get the user from the database and return it.
 */
export const userFromTokenGetter = () => (app: Elysia) => {
  return app.use(
    new Elysia({
      name: "user-from-token",
    }).use(jwt({
      secret: process.env.JWT_SECRET!,
      schema: jwtSchema
    })).derive({ as: "global" }, ({ request, jwt }): { getUserFromToken: () => Promise<User | null> } => {
      const getUserFromToken = async (): Promise<User | null> => {
        const token = request.headers.get("Authorization")?.split(" ")[1];
        if (!token) return null;
  
        const payload = await jwt.verify(token);
        if (!payload) return null;

        await database.ensureConnection();
        const user = await database.users.findById(payload.id);
        if (!user) return null;

        // @ts-expect-error : __v is not in the returned JSON type.
        const { __v, _id, ...data } = user.toJSON();
        return { id: _id.toHexString(), ...data } as User;
      }

      return { getUserFromToken };
    }),
  );
};
