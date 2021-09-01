import { buildURL } from 'dummy/utils/build-url';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { assert, module, test } from 'qunit';

module('Unit | Utility | build-url | #buildURL', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    const animal = this.server.create('animal');
    const store = this.owner.lookup('service:store');
    this.model = await store.findRecord('animal', animal.id);
  });

  module('=> with a relative path', function () {
    test('it generates a url relative to the resource', async function () {
      const url = buildURL({ path: 'regenerate', model: this.model });

      assert.equal(url, '/animals/1/regenerate');
    });
  });

  module('=> with an absolute path', function () {
    test('it uses the path', async function () {
      const url = buildURL({ path: '/regenerate', model: this.model });

      assert.equal(url, '/regenerate');
    });
  });

  module('=> with no path', function () {
    test('it uses the basepath', async function () {
      const url = buildURL({ model: this.model });

      assert.equal(url, '/animals/1');
    });
  });
});
