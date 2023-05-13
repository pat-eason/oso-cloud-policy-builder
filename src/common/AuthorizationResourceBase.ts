import { ResourceNameRequiredError } from '../exceptions/ResourceNameRequiredError';
import {
  AuthorizationRelation,
  AuthorizationResource,
  AuthorizationRule,
} from './types';

export abstract class AuthorizationResourceBase
  implements AuthorizationResource
{
  protected _name: string;
  protected _permissions: string[];
  protected _relations: AuthorizationRelation[];
  protected _roles: string[];
  protected _rules: AuthorizationRule[];

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

  public get rules(): AuthorizationRule[] {
    return this._rules;
  }

  private normalizeResourceName(name: string): string {
    return name.trim();
  }
}
