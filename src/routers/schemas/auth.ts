import { t } from "elysia";

export default t.Object({
  username: t.String({
    description: "Username of the user to sign in with. Only alphanumeric characters, hyphens, underscores and dots are allowed. Should be between 3 and 20 characters.",
    pattern: "^[a-z0-9._-]{3,20}$",
  }),
  password: t.String({
    description: "Password of the user to sign in with.",
    minLength: 6,
  })
});
