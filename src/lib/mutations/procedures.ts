import { createServerActionProcedure } from "zsa";

export const publicProcedure = createServerActionProcedure().handler(
  () => ({}),
);

export const privateProcedure = createServerActionProcedure(
  publicProcedure,
).handler(async () => {
  return {
    user: {
      id: "1",
      email: "leo@gurgel.io",
      name: "Leonardo Gurgel",
    },
  };
});
