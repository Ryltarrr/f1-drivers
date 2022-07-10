import { PrismaClient } from "@prisma/client";
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
  })
  .query("twoRandom", {
    async resolve({ ctx }) {
      const driversCount = await ctx.prisma.driver.count();
      const skip = Math.floor(Math.random() * driversCount);
      const driver1 = await ctx.prisma.driver.findMany({
        take: 1,
        skip: skip,
        orderBy: {
          name: "asc",
        },
      });
      let skip2 = Math.floor(Math.random() * driversCount);
      while (skip2 === skip) {
        skip2 = Math.floor(Math.random() * driversCount);
      }
      const driver2 = await ctx.prisma.driver.findMany({
        take: 1,
        skip: skip2,
        orderBy: {
          name: "asc",
        },
      });
      return [driver1[0], driver2[0]];
    },
  })
  .query("results", {
    async resolve({ ctx }) {
      return await ctx.prisma.vote.findMany({
        include: { driver: true },
        orderBy: { presented: "desc" },
      });
    },
  })
  .mutation("vote", {
    input: z.object({
      voted: z.object({
        driverId: z.string(),
      }),
      other: z.object({
        driverId: z.string(),
      }),
    }),
    async resolve({ ctx, input }) {
      await addVote(input.voted.driverId, true, ctx.prisma);
      await addVote(input.other.driverId, false, ctx.prisma);
      return true;
    },
  });

async function addVote(driverId: string, voted: boolean, prisma: PrismaClient) {
  const driver = await prisma.vote.upsert({
    where: {
      driverId: driverId,
    },
    update: {
      presented: {
        increment: 1,
      },
      voted: {
        increment: voted ? 1 : 0,
      },
    },
    create: {
      driverId,
      presented: 1,
      voted: voted ? 1 : 0,
    },
  });
  if (!driver) {
    throw new Error("Driver not found");
  }
}
