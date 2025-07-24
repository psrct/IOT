import { Hono } from "hono";
import route from "./students.js";
import { bearerAuth } from "hono/bearer-auth";
import { env } from "hono/adapter";

const apiRouter = new Hono();

apiRouter.get("/", (c) => {
  return c.json({ message: "Students Info API" });
});

// apiRouter.use(
//   "*",
//   bearerAuth({
//     verifyToken: async (token, c) => {
//       const { API_SECRET } = env<{ API_SECRET: string }>(c);
//       return token === API_SECRET;
//     },
//   })
// );

apiRouter.route("/students", route);

export default apiRouter;