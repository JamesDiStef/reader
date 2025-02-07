import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const validation = schema.safeParse(body);
  if (!body.userId)
    return NextResponse.json(validation.error?.errors, { status: 400 });

  const user = await prisma.user.findFirst({
    where: {
      userId: body.userId,
    },
  });

  if (user)
    return NextResponse.json(
      { error: "that user had already been added" },
      { status: 400 }
    );
  const newUser = await prisma.user.create({
    data: {
      userId: body.userId,
      bookList: [],
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
