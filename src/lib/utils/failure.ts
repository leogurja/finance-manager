export type Failure<E = Error> = {
  type: string;
  error: E;
};

export function isFailure<E>(error: unknown): error is Failure<E> {
  return (
    "type" in (error as Failure<E>) &&
    typeof (error as Failure<E>).type === "string"
  );
}
