import { FormState, SignUpFormSchema } from "../lib/defintions";

export async function signUp(state: FormState, data: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    username: data.get("username"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newUser = {
    userId: validatedFields.data.username,
    bookList: [],
  };
  await fetch(`https://reader-teal-pi.vercel.app/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
}

export async function login(state: FormState, data: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    username: data.get("username"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newUser = {
    userId: validatedFields.data.username,
    bookList: [],
  };
  await fetch(`https://reader-teal-pi.vercel.app/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
}
