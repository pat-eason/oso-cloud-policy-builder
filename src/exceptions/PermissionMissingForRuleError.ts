export class PermissionMissingForRuleError extends Error {
  constructor(permission: string) {
    super();
    Object.setPrototypeOf(this, PermissionMissingForRuleError.prototype);
    this.name = 'PermissionMissingForRuleError';
    this.message = `Cannot add Rule for Permission or Role [${permission}] not on Resource`;
  }
}
