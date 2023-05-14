export class RelationMissingForRuleError extends Error {
  constructor(relation: string) {
    super();
    Object.setPrototypeOf(this, RelationMissingForRuleError.prototype);
    this.name = 'RelationMissingForRuleError';
    this.message = `Cannot add Rule for Relation [${relation}] not on Resource`;
  }
}
