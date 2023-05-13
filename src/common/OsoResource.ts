import type {
  AuthorizationRelation,
  AuthorizationResource,
  AuthorizationRule,
} from './types';

export class OsoResource implements AuthorizationResource {
  private _name: string;
  private _permissions: string[];
  private _relations: AuthorizationRelation[];
  private _roles: string[];
  private _rules: AuthorizationRule[];

  constructor(name: string) {
    this._name = name;
    this._permissions = [];
    this._relations = [];
    this._roles = [];
    this._rules = [];
  }

  public addPermission(permission: string): void {
    if (this._permissions.find(x => x === permission)) {
      return;
    }
    this._permissions.push(permission);
  }

  public removePermission(permission: string): void {
    const foundPermissionIndex = this._permissions.findIndex(
      x => x === permission
    );
    if (foundPermissionIndex === -1) {
      return;
    }
    this._permissions.splice(foundPermissionIndex, 1);
  }

  /** @TODO relation management */

  public addRole(role: string): void {
    if (this._roles.find(x => x === role)) {
      return;
    }
    this._roles.push(role);
  }

  public removeRole(role: string): void {
    const foundRoleIndex = this._roles.findIndex(x => x === role);
    if (foundRoleIndex === -1) {
      return;
    }
    this._roles.splice(foundRoleIndex, 1);
  }

  /** @TODO rule management */

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
}
