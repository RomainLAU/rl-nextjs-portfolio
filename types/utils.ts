export type UniqueIds<T extends readonly { id: string }[]> = {
  [I in keyof T]: T[I] extends { id: infer Id }
    ? Extract<
        {
          [J in keyof T]: J extends I
            ? never
            : T[J] extends { id: infer OtherId }
              ? OtherId
              : never;
        }[number],
        Id
      > extends never
      ? T[I]
      : { id: "Error: Duplicate ID"; duplicatedId: Id }
    : T[I];
};

type Writable<T> = { -readonly [P in keyof T]: T[P] };

export function enforceUnique<const T extends readonly { id: string }[]>(
  arr: T & UniqueIds<T>
): Writable<T> {
  return arr as Writable<T>;
}
