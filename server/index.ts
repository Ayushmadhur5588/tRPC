import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const signUpType = z.object({
  username: z.string(),
  password: z.string(),
});

const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const title = opts.input.title;
    const description = opts.input.description;
    const todo = { title: title, description: description };
    //do db stuff
    return "todo";
  }),

  signUp: publicProcedure.input(signUpType).mutation(async (opts) => {
    const user = opts.ctx.username;
    const { username, password } = opts.input;
    // do authentication logic
    // jwt sign 
    return {
      token: "daljlwqjlj1213",
    };
  }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts){
    let authHeader = opts.req.headers["authorization"];
    return {
      username : "123"
    };
  }
});
server.listen(3000);

export type AppRouter = typeof appRouter;


