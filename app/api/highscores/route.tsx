import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const highscores = await prisma.highscore.findMany({
    orderBy: {
      score: "desc",
    },
  });
  return NextResponse.json(highscores);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Adding the new highscore
  const newHighscore = await prisma.highscore.create({
    data: {
      name: body.name,
      score: body.score,
    },
  });

  // Retrieve the rest of the highscores in descending order
  const highscores = await prisma.highscore.findMany({
    orderBy: {
      score: "desc",
    },
  });

  // If there are more than 10 highscores, the one with the smallest score is deleted
  if (highscores.length > 10) {
    const lowestHighscore = highscores[highscores.length - 1];
    await prisma.highscore.delete({
      where: {
        id: lowestHighscore.id,
      },
    });
  }
  return NextResponse.json(newHighscore, { status: 201 });
}
