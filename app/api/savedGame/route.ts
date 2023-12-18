import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/authOptions";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 })
    
    const userEmail = session.user?.email! 

    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })

    const userId = user!.id

    const savedGame = await prisma.savedGame.findUnique({
        where: {
            userId: userId
        }
    })
    
    return NextResponse.json(savedGame)
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 })
    
    const body = await request.json();
        
    const userEmail = session.user?.email!
    
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })
    
    const userId = user!.id
    
    const savedGame = await prisma.savedGame.upsert({
        where: { userId: userId },
        update: { boardData: body.serializedBoard, score: body.score },
        create: { userId: userId, boardData: body.serializedBoard, score: body.score },
      });

    return NextResponse.json(savedGame, { status: 201 })
}