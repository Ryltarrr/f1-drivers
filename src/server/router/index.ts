// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { driversRouter } from "./drivers";
import { teamsRouter } from "./teams";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("drivers.", driversRouter)
  .merge("teams.", teamsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
