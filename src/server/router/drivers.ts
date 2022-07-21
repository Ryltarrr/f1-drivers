import { PrismaClient, Vote } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
        include: {
          team: true,
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
        include: {
          team: true,
        },
      });
      return [driver1[0], driver2[0]];
    },
  })
  .query("results", {
    async resolve({ ctx }) {
      return await ctx.prisma.vote.findMany({
        include: {
          driver: {
            include: {
              team: true,
            },
          },
        },
        orderBy: { percentage: "desc" },
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
  const vote = await prisma.vote.findFirst({
    where: {
      driverId,
    },
  });
  let res: undefined | Vote;
  if (vote) {
    res = await prisma.vote.update({
      where: {
        driverId,
      },
      data: {
        voted: {
          increment: voted ? 1 : 0,
        },
        presented: {
          increment: 1,
        },
        percentage: voted
          ? (vote.voted + 1) / (vote.presented + 1)
          : vote.voted / (vote.presented + 1),
      },
    });
  } else {
    res = await prisma.vote.create({
      data: {
        driverId,
        presented: 1,
        voted: voted ? 1 : 0,
        percentage: voted ? 1 : 0,
      },
    });
  }
  if (!res) {
    throw new Error("Could not vote, driver not found");
  }
}
