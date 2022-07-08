// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { driverRouter } from "./driver";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("driver.", driverRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
