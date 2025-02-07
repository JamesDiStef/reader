import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  console.log("got here", params);
  const { userId } = await params;
  console.log(userId);
  let user = await prisma.user.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { title: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const book = await prisma.book.findFirst({
    where: {
      title: params.title,
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
