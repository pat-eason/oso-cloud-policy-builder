import { AuthorizationResourceBase } from './AuthorizationResourceBase';
import type { AuthorizationResource, AuthorizationResourceRule } from './types';

export class OsoResource extends AuthorizationResourceBase {
  public addPermission(permission: string): this {
    if (this._permissions.find(x => x === permission)) {
      return this;
    }
    this._permissions.push(permission);
    return this;
  }

  public removePermission(permission: string): this {
    const foundPermissionIndex = this._permissions.findIndex(
      x => x === permission
    );
    if (foundPermissionIndex === -1) {
      return this;
    }
    this._permissions.splice(foundPermissionIndex, 1);
    return this;
  }

  public addRelation(name: string, resource: AuthorizationResource): this {
    if (this._relations.find(x => x.key === name)) {
      return this;
    }
    this._relations.push({ key: name, resource });
    return this;
  }

  public removeRelation(name: string): this {
    const foundRelationIndex = this._relations.findIndex(x => x.key === name);
    if (foundRelationIndex === -1) {
      return this;
    }
    this._relations.splice(foundRelationIndex, 1);
    return this;
  }

  public addRole(role: string): this {
    if (this._roles.find(x => x === role)) {
      return this;
    }
    this._roles.push(role);
    return this;
  }

  public removeRole(role: string): this {
    const foundRoleIndex = this._roles.findIndex(x => x === role);
    if (foundRoleIndex === -1) {
      return this;
    }
    this._roles.splice(foundRoleIndex, 1);
    return this;
  }

  public addRule(permission: string, target: string, relation?: string): this {
    if (
      this._rules.find(
        x =>
          x.permission === permission &&
          x.target === target &&
          x.relation === relation
      )
    ) {
      return this;
    }
    const pushRule: AuthorizationResourceRule = { permission, target };
    if (relation) {
      pushRule.relation = relation;
    }
    this._rules.push(pushRule);
    return this;
  }

  public removeRule(
    permission: string,
    target: string,
    relation?: string
  ): this {
    const foundRuleIndex = this._rules.findIndex(
      x =>
        x.permission === permission &&
        x.target === target &&
        x.relation === relation
    );
    if (foundRuleIndex === -1) {
      return this;
    }
    this._rules.splice(foundRuleIndex, 1);
    return this;
  }
}
