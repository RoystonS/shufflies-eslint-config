export class TestClass {
  public testMethod(condition: boolean): string {
    return condition ? "Condition is true" : "Condition is false";
  }
  public revcmp(a: number, b: number): number {
    // unicorn/no-nested-ternary wants brackets here, but prettier wants it this way.
    // prettier wins.
    return a < b ? 1 : a === b ? 0 : -1;
  }
}
