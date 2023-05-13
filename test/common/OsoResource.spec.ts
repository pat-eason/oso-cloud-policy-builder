import { faker } from '@faker-js/faker';

import { OsoResource } from '../../src/common/OsoResource';

describe('OsoResource', () => {
  const resourceNameTest = 'ExampleTestResource';

  it('Retrieve name of resource', () => {
    const osoResource = new OsoResource(resourceNameTest);
    expect(osoResource.name).toEqual(resourceNameTest);
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

    it('Adding an existing permission does not add it to the permission colelction', () => {
      const addPermissionTest = faker.random.word();
      const osoResource = new OsoResource(resourceNameTest);
      for (
        let i = 0;
        i <
        faker.datatype.number({
          min: 1,
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

  describe('role management', () => {
    test.todo('Defaults roles to an empty collection');
    test.todo('Add roles to resource');
    test.todo('Remove roles from resource');
  });
});
