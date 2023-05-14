export class ResourceValidationError extends Error {
  private validationErrors: Error[] = [];

  constructor(errors: Error[]) {
    super();
    Object.setPrototypeOf(this, ResourceValidationError.prototype);
    this.name = 'ResourceValidationError';
    this.message = 'Could not validate Oso Resource';
    this.validationErrors = errors;
  }

  public get errors(): Error[] {
    return this.validationErrors;
  }
}
