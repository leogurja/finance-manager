import { fromPromise } from "neverthrow";

export function safeFetch(input: RequestInfo | URL, init?: RequestInit) {
  return fromPromise(fetch(input, init), (error) => ({
    type: "FETCH_FAILED",
    error,
  }));
}
