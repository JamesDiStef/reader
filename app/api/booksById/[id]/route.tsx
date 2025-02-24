import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const book = await prisma.book.findFirst({
    where: {
      id: id,
    },
  });

  if (!book)
    return NextResponse.json({ error: "Book not found" }, { status: 404 });

  return NextResponse.json(book);
}
