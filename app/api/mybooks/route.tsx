import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.book.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const validation = schema.safeParse(body);
  if (!body.title || !body.author)
    return NextResponse.json(validation.error?.errors, { status: 400 });

  const book = await prisma.book.findFirst({
    where: {
      title: body.title,
      author: body.author,
    },
  });

  if (book)
    return NextResponse.json(
      { error: "that book had already been added" },
      { status: 400 }
    );
  const newUser = await prisma.book.create({
    data: {
      title: body.title,
      author: body.author,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
