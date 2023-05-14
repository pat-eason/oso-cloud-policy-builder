import type { AuthorizationRelation } from './AuthorizationRelation';
import type { AuthorizationRule } from './AuthorizationRule';

export interface AuthorizationResource {
  name: string;
  permissions: string[];
  relations: AuthorizationRelation[];
  roles: string[];
  rules: AuthorizationRule[];
}
