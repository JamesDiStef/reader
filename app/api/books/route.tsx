import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const skip = parseInt(url.searchParams.get("skip") || "0");
  const take = parseInt(url.searchParams.get("take") || "10");
  const searchString = url.searchParams.get("searchString") || "";

  const books = await prisma.book.findMany({
    skip: skip,
    take: take,
    where: {
      OR: [
        {
          title: {
            contains: searchString,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: searchString,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return NextResponse.json(books);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
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

// const books = [
//   { title: "the dragonbone chair", author: "tad williams" },
//   { title: "stone of farewells", author: "tad williams" },
//   { title: "to green angel tower", author: "tad williams" },
//   { title: "otherland", author: "tad williams" },
//   { title: "shadowmarch", author: "tad williams" },
//   { title: "the war of the flowers", author: "tad williams" },
//   { title: "the witchwood crown", author: "tad williams" },
//   { title: "the dirty streets of heaven", author: "tad williams" },
//   { title: "the dark place", author: "tad williams" },
//   { title: "the dragon's path", author: "fonda lee" },
//   { title: "the skyblaze", author: "fonda lee" },
//   { title: "jade city", author: "fonda lee" },
//   { title: "jade war", author: "fonda lee" },
//   { title: "jade legacy", author: "fonda lee" },
//   { title: "the long way to a small, angry planet", author: "becky chambers" },
//   { title: "the essence of things", author: "phillip pullman" },
//   { title: "the golden compass", author: "phillip pullman" },
//   { title: "the subtle knife", author: "phillip pullman" },
//   { title: "the amber spyglass", author: "phillip pullman" },
//   { title: "la belle sauvage", author: "phillip pullman" },
//   { title: "the secret commonwealth", author: "phillip pullman" },
//   { title: "the book of dust", author: "phillip pullman" },
//   { title: "the right stuff", author: "jonathan franzen" },
//   { title: "the corrections", author: "jonathan franzen" },
//   { title: "freedom", author: "jonathan franzen" },
//   { title: "purity", author: "jonathan franzen" },
//   { title: "crossroads", author: "jonathan franzen" },
//   { title: "a mind at play", author: "jim jones" },
//   { title: "the hitchhiker's guide to the galaxy", author: "douglas adams" },
//   {
//     title: "the restaurant at the end of the universe",
//     author: "douglas adams",
//   },
//   { title: "life, the universe and everything", author: "douglas adams" },
//   { title: "so long, and thanks for all the fish", author: "douglas adams" },
//   { title: "mostly harmless", author: "douglas adams" },
//   { title: "the long dark tea-time of the soul", author: "douglas adams" },
//   { title: "dirk gently's holistic detective agency", author: "douglas adams" },
//   { title: "the confessions of max torres", author: "george saunders" },
//   { title: "the tennessee hammer", author: "george saunders" },
//   { title: "the tenth of december", author: "george saunders" },
//   { title: "civil warland in bad decline", author: "george saunders" },
//   { title: "george saunders: stories", author: "george saunders" },
//   { title: "lincoln in the bardo", author: "george saunders" },
//   { title: "the remains of the day", author: "george saunders" },
// ];

// export async function POST(request: NextRequest) {
//   for (let i = 0; i < books.length; i++) {
//     const newUser = await prisma.book.create({
//       data: {
//         title: books[i].title,
//         author: books[i].author,
//       },
//     });
//   }

//}
