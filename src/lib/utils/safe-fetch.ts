import { fromPromise } from "neverthrow";
import { FetchError } from "../errors/fetch-error";

export function safeFetch(input: RequestInfo | URL, init?: RequestInit) {
  return fromPromise(
    fetch(input, init),
    (error) => new FetchError("Failed to fetch", { cause: error }),
  );
}
