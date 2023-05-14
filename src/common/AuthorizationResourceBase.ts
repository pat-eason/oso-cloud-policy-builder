import { PermissionMissingForRuleError } from '../exceptions/PermissionMissingForRuleError';
import { ResourceNameRequiredError } from '../exceptions/ResourceNameRequiredError';
import { ResourceValueInvalidError } from '../exceptions/ResourceValueInvalidError';
import {
  AuthorizationRelation,
  AuthorizationResource,
  AuthorizationResourceRule,
} from './types';
import { ResourceValidationResult } from './types/ResourceValidationResult';

export abstract class AuthorizationResourceBase
  implements AuthorizationResource
{
  protected _name: string;
  protected _permissions: string[];
  protected _relations: AuthorizationRelation[];
  protected _roles: string[];
  protected _rules: AuthorizationResourceRule[];

  constructor(name: string) {
    if (!name?.trim()) {
      throw new ResourceNameRequiredError();
    }
    this._name = this.normalizeResourceName(name);
    this._permissions = [];
    this._relations = [];
    this._roles = [];
    this._rules = [];
  }

  public get name(): string {
    return this._name;
  }

  public get permissions(): string[] {
    return this._permissions;
  }

  public get relations(): AuthorizationRelation[] {
    return this._relations;
  }

  public get roles(): string[] {
    return this._roles;
  }

  public get rules(): AuthorizationResourceRule[] {
    return this._rules;
  }

  public validate(): ResourceValidationResult {
    return {
      errors: [
        ...this.validatePermissions(),
        ...this.validateRelations(),
        ...this.validateRoles(),
        ...this.validateRules(),
      ],
    };
  }

  private validatePermissions(): Error[] {
    const errors: Error[] = [];

    this._permissions.forEach(x => {
      if (!x) {
        errors.push(new ResourceValueInvalidError('permission', x));
      }
    });

    return errors;
  }

  private validateRelations(): Error[] {
    const errors: Error[] = [];

    this._relations.forEach(x => {
      if (!x.key) {
        errors.push(new ResourceValueInvalidError('relation.key', x.key));
      }
    });

    return errors;
  }

  private validateRoles(): Error[] {
    const errors: Error[] = [];

    this._roles.forEach(x => {
      if (!x) {
        errors.push(new ResourceValueInvalidError('role', x));
      }
    });

    return errors;
  }

  private validateRules(): Error[] {
    const errors: Error[] = [];

    this._rules.forEach(x => {
      if (!x.permission) {
        errors.push(
          new ResourceValueInvalidError('rule.permission', x.permission)
        );
      }

      if (!x.target) {
        errors.push(new ResourceValueInvalidError('rule.target', x.permission));
      }

      if (
        x.permission &&
        !(
          this._permissions.includes(x.permission) ||
          this._roles.includes(x.permission)
        )
      ) {
        errors.push(new PermissionMissingForRuleError(x.permission));
      }

      if (
        x.target &&
        !(
          this._permissions.includes(x.target) || this._roles.includes(x.target)
        )
      ) {
        errors.push(new PermissionMissingForRuleError(x.target));
      }
    });

    return errors;
  }

  private normalizeResourceName(name: string): string {
    return name.trim();
  }
}
