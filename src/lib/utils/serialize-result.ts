// utils/result-serialize.ts
import type { Result, ResultAsync } from "neverthrow";
import type { Failure } from "./failure";

export type SerializedResult<T> =
  | { error: null; value: T }
  | { error: string; value: null };

export function serializeResult<T, E = Error>(
  result: Result<T, Failure<E>>,
): SerializedResult<T> {
  if (result.isOk()) return { error: null, value: result.value };

  return { value: null, error: result.error.type };
}

export async function serializeResultAsync<T, E = Error>(
  result: ResultAsync<T, Failure<E>>,
): Promise<SerializedResult<T>> {
  const awaited = await result;
  if (awaited.isOk()) return { error: null, value: awaited.value };

  return { error: awaited.error.type, value: null };
}
