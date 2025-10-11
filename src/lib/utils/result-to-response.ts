import type { Result } from "neverthrow";

const errorMap: Record<string, number | undefined> = {
  ZodError: 400,
};

export function resultToResponse<T, E extends Error>(result: Result<T, E>) {
  if (result.isOk()) return Response.json(result.value);

  return Response.json(result.error, {
    status: errorMap[result.error.name] ?? 500,
  });
}
