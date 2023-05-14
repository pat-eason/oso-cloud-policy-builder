export class ResourceValueInvalidError extends Error {
  constructor(type: string, value: string) {
    super();
    Object.setPrototypeOf(this, ResourceValueInvalidError.prototype);
    this.name = 'ResourceValueInvalidError';
    this.message = `Invalid value [${value}] for type [${type}]`;
  }
}
