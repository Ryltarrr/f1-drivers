import { createRouter } from "./context";

export const driverRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.driver.findMany();
    },
  });
