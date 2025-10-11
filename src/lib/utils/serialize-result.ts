// utils/result-serialize.ts
import type { Result, ResultAsync } from "neverthrow";

export type SerializedResult<T, E> =
  | { error: null; value: T }
  | { error: E; value: null };

export function serializeResult<T, E>(
  result: Result<T, E>,
): SerializedResult<T, E> {
  if (result.isOk()) return { error: null, value: result.value };

  return { value: null, error: result.error };
}

export async function serializeResultAsync<T, E>(
  result: ResultAsync<T, E>,
): Promise<SerializedResult<T, E>> {
  const awaited = await result;
  if (awaited.isOk()) return { error: null, value: awaited.value };

  return { error: awaited.error, value: null };
}
