import { Book } from "@prisma/client";
import BookFound from "../components/BookFound";

export default async function Page(props: {
  searchParams?: Promise<{
    user?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.user || "";
  let count = 0;

  const books: Book[] = [];

  const response = await fetch(
    `https://reader-teal-pi.vercel.app/api/users/${query}`
  );
  const user = await response.json();
  const bookIds = user.bookList;
  for (let i = 0; i < bookIds?.length; i++) {
    const book = await fetch(
      `https://reader-teal-pi.vercel.app/api/booksById/${bookIds[i]}`
    );
    books.push(await book.json());
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {books.map((b) => (
        <BookFound key={count++} book={b} />
      ))}
    </div>
  );
}
