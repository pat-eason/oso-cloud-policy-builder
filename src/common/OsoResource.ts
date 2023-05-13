import { AuthorizationResourceBase } from './AuthorizationResourceBase';
import type { AuthorizationResource } from './types';

export class OsoResource extends AuthorizationResourceBase {
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

  public addRelation(name: string, resource: AuthorizationResource): void {
    if (this._relations.find(x => x.key === name)) {
      return;
    }
    this._relations.push({ key: name, resource });
  }

  public removeRelation(name: string): void {
    const foundRelationIndex = this._relations.findIndex(x => x.key === name);
    if (foundRelationIndex === -1) {
      return;
    }
    this._relations.splice(foundRelationIndex, 1);
  }

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

  public addRule(permission: string, target: string, relation?: string): void {
    if (
      this._rules.find(
        x =>
          x.permission === permission &&
          x.target === target &&
          x.relation === relation
      )
    ) {
      return;
    }
    this._rules.push({
      permission,
      target,
      relation,
    });
  }

  public removeRule(
    permission: string,
    target: string,
    relation?: string
  ): void {
    const foundRuleIndex = this._rules.findIndex(
      x =>
        x.permission === permission &&
        x.target === target &&
        x.relation === relation
    );
    if (foundRuleIndex === -1) {
      return;
    }
    this._rules.splice(foundRuleIndex, 1);
  }
}
