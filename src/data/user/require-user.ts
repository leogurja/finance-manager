import { ok } from "neverthrow";
import { cache } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export const requireUser = cache(() =>
  ok<User>({
    id: "1",
    email: "leo@gurgel.io",
    name: "Leonardo Gurgel",
  }),
);
