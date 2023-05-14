import type { AuthorizationRelation } from './AuthorizationRelation';
import type { AuthorizationResourceRule } from './AuthorizationResourceRule';

export interface AuthorizationResource {
  name: string;
  permissions: string[];
  relations: AuthorizationRelation[];
  roles: string[];
  rules: AuthorizationResourceRule[];
}
