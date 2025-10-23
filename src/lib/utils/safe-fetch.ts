import { fromPromise } from 'neverthrow';

export function safeFetch(input: RequestInfo | URL, init?: RequestInit) {
  return fromPromise(fetch(input, init), (error) => ({
    error,
    type: 'FETCH_FAILED',
  }));
}
