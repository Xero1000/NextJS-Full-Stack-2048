import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number }
}

export function GET(request: NextRequest, { params }: Props) {
    if (params.id > 10) 
        return NextResponse.json({ error: "highscore not found" }, { status: 404 })

    return NextResponse.json({ id: 1, name: "Mosh" })
} 

export function DELETE(request: NextRequest, { params }: Props) {
    if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 })

    return NextResponse.json({})
}