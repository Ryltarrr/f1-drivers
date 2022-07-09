import { z } from "zod";
import { createRouter } from "./context";

export const driversRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.driver.findMany();
    },
  })
  .query("byName", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.driver.findFirst({
        where: {
          name: input,
        },
      });
    },
  });
