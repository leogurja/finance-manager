import type { Result } from "neverthrow";

export function resultToActionResponse<T, E extends Error>(
  result: Result<T, E>,
) {
  if (result.isOk()) return result.value;

  throw result.error;
}
