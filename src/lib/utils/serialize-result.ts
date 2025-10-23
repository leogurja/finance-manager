// utils/result-serialize.ts
import type { Result, ResultAsync } from 'neverthrow';
import type { Failure } from './failure';

export type SerializedResult<T> =
  | { value: T; error: null }
  | { value: null; error: string };

export function serializeResult<T, E = Error>(
  result: Result<T, Failure<E>>,
): SerializedResult<T> {
  if (result.isOk()) return { value: result.value, error: null };

  return { value: null, error: result.error.type };
}

export async function serializeResultAsync<T, E = Error>(
  result: ResultAsync<T, Failure<E>>,
): Promise<SerializedResult<T>> {
  const awaited = await result;
  if (awaited.isOk()) return { value: awaited.value, error: null };

  return { value: null, error: awaited.error.type };
}
