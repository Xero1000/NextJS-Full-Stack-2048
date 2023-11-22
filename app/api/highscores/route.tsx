import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function GET(request: NextRequest) {
    const body = await request.json()
    return NextResponse.json("hello")
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = schema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    return NextResponse.json({ name: body.name, score: body.score }, { status: 201 })
}

