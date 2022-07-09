import { z } from "zod";
import { createRouter } from "./context";

export const teamsRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.team.findMany();
    },
  })
  .query("byName", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.team.findFirst({
        where: {
          name: input,
        },
      });
    },
  });
