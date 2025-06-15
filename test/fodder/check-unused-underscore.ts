export function someFunction(
  // value1 is unused, but has an underscore prefix, so it's fine.
  _value1: number,
  // value2 is unused, but has no underscore prefix, so it should be reported.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value2: string
) {
  return 42;
}
