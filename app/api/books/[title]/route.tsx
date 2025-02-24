import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  const book = await prisma.book.findFirst({
    where: {
      title: title.toLowerCase(),
    },
  });

  if (!book)
    return NextResponse.json({ error: "Book not found" }, { status: 404 });

  return NextResponse.json(book);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const book = await prisma.book.findFirst({
    where: {
      title: (await params).title,
    },
  });

  if (!book)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  const updatedUser = await prisma.book.update({
    where: { id: book.title },
    data: {
      title: body.title,
      author: body.author,
    },
  });
  return NextResponse.json(updatedUser, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  const book = await prisma.book.findFirst({
    where: {
      title: (await params).title,
    },
  });
  if (!book)
    return NextResponse.json(
      { error: "that user does not even exist" },
      { status: 404 }
    );

  //   prisma.book.delete({
  //     where: { title: book.title },
  //   });
  return NextResponse.json({});
}
