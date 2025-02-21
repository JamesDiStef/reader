import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);
  const book = await prisma.book.findFirst({
    where: {
      id: id,
    },
  });

  if (!book)
    return NextResponse.json({ error: "Book not found" }, { status: 404 });

  return NextResponse.json(book);
}
