import { t } from "elysia";

export default t.Object({
  loggedInAt: t.Integer({
    description: "Timestamp of when the user logged in.",
  }),

  id: t.String({
    description: "ID of the currently logged in user."
  })
});
