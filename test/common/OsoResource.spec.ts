import { faker } from '@faker-js/faker';

import { OsoResource } from '../../src/common/OsoResource';
import {
  AuthorizationRelation,
  AuthorizationRule,
} from '../../src/common/types';
import { ResourceNameRequiredError } from '../../src/exceptions/ResourceNameRequiredError';

describe('OsoResource', () => {
  const resourceNameTest = faker.random.word();

  it('Retrieve name of resource', () => {
    const osoResource = new OsoResource(resourceNameTest);
    expect(osoResource.name).toEqual(resourceNameTest);
  });

  test.each(['', ' ', '      '])(
    'Throws if name provided is not valid [%p]',
    (value: string) => {
      expect(() => new OsoResource(value)).toThrow(
        new ResourceNameRequiredError()
      );
    }
  );

  test.each([
    `${faker.random.word()} `,
    `${faker.random.word()}      `,
    ` ${faker.random.word()}`,
    `      ${faker.random.word()}`,
    ` ${faker.random.word()} `,
    `      ${faker.random.word()}      `,
  ])('Normalizes resource name [%p]', (value: string) => {
    const osoResource = new OsoResource(value);
    expect(osoResource.name).toEqual(value.trim());
  });

  describe('permission management', () => {
    const permissionsTest = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    it('Defaults permissions to an empty collection', () => {
      const osoResource = new OsoResource(resourceNameTest);
      expect(osoResource.permissions).toHaveLength(0);
    });

    it('Add permissions to resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      permissionsTest.forEach(x => osoResource.addPermission(x));

      expect(osoResource.permissions).toHaveLength(permissionsTest.length);
      expect(osoResource.permissions).toEqual(permissionsTest);
    });

    it('Adding an existing permission does not add it to the permission collection', () => {
      const addPermissionTest = faker.random.word();
      const osoResource = new OsoResource(resourceNameTest);
      for (
        let i = 0;
        i <
        faker.datatype.number({
          min: 2,
          max: 20,
        });
        i++
      ) {
        osoResource.addPermission(addPermissionTest);
      }

      expect(osoResource.permissions).toHaveLength(1);
      expect(osoResource.permissions).toEqual([addPermissionTest]);
    });

    it('Remove permissions from resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      permissionsTest.forEach(x => osoResource.addPermission(x));
      osoResource.removePermission(permissionsTest[0]);

      expect(osoResource.permissions).toHaveLength(permissionsTest.length - 1);
      expect(osoResource.permissions).toEqual(permissionsTest.slice(1));
    });

    it('Gracefully handles removing a permission that does not exist', () => {
      const addPermissionTest = faker.random.word();
      const osoResource = new OsoResource(resourceNameTest);
      osoResource.addPermission(addPermissionTest);
      osoResource.removePermission(`does.not.exist.${addPermissionTest}`);

      expect(osoResource.permissions).toHaveLength(1);
      expect(osoResource.permissions).toEqual([addPermissionTest]);
    });
  });

  describe('relation management', () => {
    const relationResourcesTest: AuthorizationRelation[] = [
      {
        key: faker.random.word(),
        resource: new OsoResource(faker.random.word()),
      },
      {
        key: faker.random.word(),
        resource: new OsoResource(faker.random.word()),
      },
      {
        key: faker.random.word(),
        resource: new OsoResource(faker.random.word()),
      },
    ];

    it('Defaults relations to an empty collection', () => {
      const osoResource = new OsoResource(resourceNameTest);
      expect(osoResource.relations).toHaveLength(0);
    });

    it('Add relations to resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      relationResourcesTest.forEach(x =>
        osoResource.addRelation(x.key, x.resource)
      );

      expect(osoResource.relations).toHaveLength(relationResourcesTest.length);
      expect(osoResource.relations).toEqual(relationResourcesTest);
    });

    it('Adding an existing relation does not add it to the relation collection', () => {
      const addRelationResourceTest: AuthorizationRelation = {
        key: faker.random.word(),
        resource: new OsoResource(faker.random.word()),
      };
      const osoResource = new OsoResource(resourceNameTest);

      for (
        let i = 0;
        i <
        faker.datatype.number({
          min: 2,
          max: 20,
        });
        i++
      ) {
        osoResource.addRelation(
          addRelationResourceTest.key,
          addRelationResourceTest.resource
        );
      }

      expect(osoResource.relations).toHaveLength(1);
      expect(osoResource.relations).toEqual([addRelationResourceTest]);
    });

    it('Remove relations from resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      relationResourcesTest.forEach(x =>
        osoResource.addRelation(x.key, x.resource)
      );
      osoResource.removeRelation(relationResourcesTest[0].key);

      expect(osoResource.relations).toHaveLength(
        relationResourcesTest.length - 1
      );
      expect(osoResource.relations).toEqual(relationResourcesTest.slice(1));
    });

    it('Gracefully handles removing a relation that does not exist', () => {
      const addRelationResourceTest: AuthorizationRelation = {
        key: faker.random.word(),
        resource: new OsoResource(faker.random.word()),
      };
      const osoResource = new OsoResource(resourceNameTest);
      osoResource.addRelation(
        addRelationResourceTest.key,
        addRelationResourceTest.resource
      );
      osoResource.removeRelation(
        `does.not.exist.${addRelationResourceTest.key}`
      );

      expect(osoResource.relations).toHaveLength(1);
      expect(osoResource.relations).toEqual([addRelationResourceTest]);
    });
  });

  describe('role management', () => {
    const rolesTest = [
      faker.random.word(),
      faker.random.word(),
      faker.random.word(),
    ];

    it('Defaults roles to an empty collection', () => {
      const osoResource = new OsoResource(resourceNameTest);
      expect(osoResource.roles).toHaveLength(0);
    });

    it('Add roles to resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      rolesTest.forEach(x => osoResource.addRole(x));

      expect(osoResource.roles).toHaveLength(rolesTest.length);
      expect(osoResource.roles).toEqual(rolesTest);
    });

    it('Adding an existing role does not add it to the roles collection', () => {
      const addRoleTest = faker.random.word();
      const osoResource = new OsoResource(resourceNameTest);
      for (
        let i = 0;
        i <
        faker.datatype.number({
          min: 2,
          max: 20,
        });
        i++
      ) {
        osoResource.addRole(addRoleTest);
      }

      expect(osoResource.roles).toHaveLength(1);
      expect(osoResource.roles).toEqual([addRoleTest]);
    });

    it('Remove roles from resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      rolesTest.forEach(x => osoResource.addRole(x));
      osoResource.removeRole(rolesTest[0]);

      expect(osoResource.roles).toHaveLength(rolesTest.length - 1);
      expect(osoResource.roles).toEqual(rolesTest.slice(1));
    });

    it('Gracefully handles removing a role that does not exist', () => {
      const addRoleTest = faker.random.word();
      const osoResource = new OsoResource(resourceNameTest);
      osoResource.addRole(addRoleTest);
      osoResource.removeRole(`does.not.exist.${addRoleTest}`);

      expect(osoResource.roles).toHaveLength(1);
      expect(osoResource.roles).toEqual([addRoleTest]);
    });
  });

  describe('rule management', () => {
    const rulesTest: AuthorizationRule[] = [
      { permission: faker.random.word(), target: faker.random.word() },
      {
        permission: faker.random.word(),
        target: faker.random.word(),
        relation: faker.random.word(),
      },
      { permission: faker.random.word(), target: faker.random.word() },
    ];

    it('Defaults rules to an empty collection', () => {
      const osoResource = new OsoResource(resourceNameTest);
      expect(osoResource.rules).toHaveLength(0);
    });

    it('Add rules to resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      rulesTest.forEach(x =>
        osoResource.addRule(x.permission, x.target, x.relation)
      );

      expect(osoResource.rules).toHaveLength(rulesTest.length);
      expect(osoResource.rules).toEqual(rulesTest);
    });

    it('Adding an existing rule does not add it to the rules collection', () => {
      const addRuleTest = {
        permission: faker.random.word(),
        target: faker.random.word(),
        relation: faker.random.word(),
      };
      const osoResource = new OsoResource(resourceNameTest);
      for (
        let i = 0;
        i <
        faker.datatype.number({
          min: 2,
          max: 20,
        });
        i++
      ) {
        osoResource.addRule(
          addRuleTest.permission,
          addRuleTest.target,
          addRuleTest.relation
        );
      }

      expect(osoResource.rules).toHaveLength(1);
      expect(osoResource.rules).toEqual([addRuleTest]);
    });

    it('Remove rules from resource', () => {
      const osoResource = new OsoResource(resourceNameTest);
      rulesTest.forEach(x =>
        osoResource.addRule(x.permission, x.target, x.relation)
      );
      osoResource.removeRule(
        rulesTest[0].permission,
        rulesTest[0].target,
        rulesTest[0].relation
      );

      expect(osoResource.rules).toHaveLength(rulesTest.length - 1);
      expect(osoResource.rules).toEqual(rulesTest.slice(1));
    });

    it('Gracefully handles removing a rule that does not exist', () => {
      const addRuleTest = {
        permission: faker.random.word(),
        target: faker.random.word(),
        relation: faker.random.word(),
      };
      const osoResource = new OsoResource(resourceNameTest);
      osoResource.addRule(
        addRuleTest.permission,
        addRuleTest.target,
        addRuleTest.relation
      );
      osoResource.removeRule(
        `does.not.exist.${addRuleTest.permission}`,
        addRuleTest.target,
        addRuleTest.relation
      );
      osoResource.removeRule(
        addRuleTest.permission,
        `does.not.exist.${addRuleTest.target}`,
        addRuleTest.relation
      );
      osoResource.removeRule(
        addRuleTest.permission,
        addRuleTest.target,
        `does.not.exist.${addRuleTest.relation}`
      );

      expect(osoResource.rules).toHaveLength(1);
      expect(osoResource.rules).toEqual([addRuleTest]);
    });
  });

  describe('Sandbox demo example', () => {
    it('Generates an Organization resource', () => {
      const organizationResource = new OsoResource('Organization');
      organizationResource
        .addRole('viewer')
        .addRole('owner')
        .addPermission('view')
        .addPermission('edit')
        .addRule('view', 'viewer')
        .addRule('edit', 'owner')
        .addRule('viewer', 'owner');

      expect(organizationResource.name).toEqual('Organization');
      expect(organizationResource.permissions).toEqual(['view', 'edit']);
      expect(organizationResource.roles).toEqual(['viewer', 'owner']);
      expect(organizationResource.rules).toEqual([
        { permission: 'view', target: 'viewer' },
        { permission: 'edit', target: 'owner' },
        { permission: 'viewer', target: 'owner' },
      ]);
    });

    it('Generates a Repository resource', () => {
      const organizationResource = new OsoResource('Organization');
      const repositoryResource = new OsoResource('Repository');
      repositoryResource
        .addRole('viewer')
        .addRole('owner')
        .addRole('contributor')
        .addPermission('view')
        .addPermission('edit')
        .addPermission('create')
        .addRelation('parent', organizationResource)
        .addRule('view', 'viewer')
        .addRule('edit', 'contributor')
        .addRule('create', 'owner')
        .addRule('viewer', 'contributor')
        .addRule('contributor', 'owner')
        .addRule('viewer', 'viewer', 'parent')
        .addRule('owner', 'owner', 'parent');

      expect(repositoryResource.name).toEqual('Repository');
      expect(repositoryResource.permissions).toEqual([
        'view',
        'edit',
        'create',
      ]);
      expect(repositoryResource.roles).toEqual([
        'viewer',
        'owner',
        'contributor',
      ]);
      expect(repositoryResource.relations).toEqual([
        { key: 'parent', resource: organizationResource },
      ]);
      expect(repositoryResource.rules).toEqual([
        { permission: 'view', target: 'viewer' },
        { permission: 'edit', target: 'contributor' },
        { permission: 'create', target: 'owner' },
        { permission: 'viewer', target: 'contributor' },
        { permission: 'contributor', target: 'owner' },
        { permission: 'viewer', target: 'viewer', relation: 'parent' },
        { permission: 'owner', target: 'owner', relation: 'parent' },
      ]);
    });
  });

  describe('vaidation', () => {
    it('Invalid permissions fail validation', () => {
      const osoResource = new OsoResource(resourceNameTest);
      osoResource.addPermission('test').addPermission('').addPermission('  ');

      const result = osoResource.validate();
      expect(result).toHaveProperty('errors');
      expect(result.errors).toHaveLength(1);
    });

    test.todo('Invalid relations fail validation');
    test.todo('Invalid roles fail validation');
    test.todo('Invalid rules fail validation');
  });
});
