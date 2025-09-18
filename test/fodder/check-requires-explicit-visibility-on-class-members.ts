export class MyClass {
  public goodPublicProperty = "X";
  private goodPrivateProperty = "X";

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  badPropertyWithoutVisibility = "X";

  public goodPublicMethod() {
    // Read + write all properties to ensure they're used
    this.goodPublicProperty = this.goodPrivateProperty;
    this.goodPrivateProperty = this.badPropertyWithoutVisibility;
    this.badPropertyWithoutVisibility = this.goodPublicProperty;

    this.goodPrivateMethod();
    this.badMethodWithoutVisibility();
  }
  private goodPrivateMethod() {}

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  badMethodWithoutVisibility() {}
}
