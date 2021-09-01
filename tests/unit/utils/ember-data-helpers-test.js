import {
  modelNameFromModel,
  snapshotFromModel,
  adapterFromModel,
} from 'dummy/utils/ember-data-helpers';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { assert, module, test } from 'qunit';

module('Unit | Utility | ember-data-helpers', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    const animal = this.server.create('animal');
    const store = this.owner.lookup('service:store');
    this.model = await store.findRecord('animal', animal.id);
  });

  module(' | #modelNameFromModel', function () {
    test('it returns the model name of the model', function () {
      const modelName = modelNameFromModel(this.model);

      assert.equal(modelName, 'animal');
    });
  });

  module(' | #snapshotFromModel', function () {
    test('it returns a snapshot of the model', function () {
      const snapshot = snapshotFromModel(this.model);

      assert.equal(snapshot.constructor.name, 'Snapshot');
      assert.equal(snapshot.id, '1');
      assert.equal(snapshot.modelName, 'animal');
    });
  });

  module(' | #adapterFromModel', function () {
    test('it returns the adapter for the model', function () {
      const adapter = adapterFromModel(this.model);

      assert.equal(adapter.constructor.name, 'JSONAPIAdapter');
    });
  });
});
