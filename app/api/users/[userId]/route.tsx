import prisma from "@/prisma/client";
import { Book } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  }
) {
  const { userId } = await params;
  const user = await prisma.user.findFirst({
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
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  }
) {
  const { userId } = await params;
  const bookList = await request.json();

  console.log(bookList);
  // const body = await request.json();
  // const validation = schema.safeParse(body);
  // if (!validation.success)
  //   return NextResponse.json(validation.error.errors, { status: 400 });

  const ids = bookList.map((b: Book) => b.id);

  const updatedUser = await prisma.user.update({
    where: { userId: userId },
    data: {
      bookList: ids,
    },
  });

  console.log(updatedUser);
  return NextResponse.json(updatedUser, { status: 200 });
}
