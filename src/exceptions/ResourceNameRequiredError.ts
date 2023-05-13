export class ResourceNameRequiredError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, ResourceNameRequiredError.prototype);
    this.name = 'ResourceNameRequiredError';
    this.message = 'Name is required when creating an Oso Resource';
  }
}
