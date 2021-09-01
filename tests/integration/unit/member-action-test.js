import sinon from 'sinon';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { assert, module, test } from 'qunit';

module('Integration | Utility | member-action | #member', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    sinon.spy(JSONAPIAdapter.prototype, 'ajax');
    const animal = this.server.create('animal');
    const store = this.owner.lookup('service:store');
    this.model = await store.findRecord('animal', animal.id);
  });

  hooks.afterEach(function () {
    sinon.restore();
  });

  test('it passes the response to the supplied method', function (a) {
    const done = a.async();
    const fake = sinon.fake();
    const fakeLogger = { log: fake };
    this.model.logger = fakeLogger;

    this.model.callWithNothing().then(() => {
      assert.equal(fake.callCount, 1);
      assert.equal(fake.lastCall.args[0].data.type, 'animals');
      done();
    });
  });

  module('=> with argument :path', function () {
    test('it uses the passed in path', async function () {
      this.model.callWithPath();

      const call = JSONAPIAdapter.prototype.ajax.getCall(1);
      assert.ok(call.args[0].match(/foo/));
    });
  });

  module('=> with argument :verb', function () {
    test('it uses the passed in verb', async function () {
      this.model.callWithVerb();

      const call = JSONAPIAdapter.prototype.ajax.getCall(1);
      assert.equal(call.args[1], 'POST');
    });
  });

  module('=> with no arguments', function () {
    test('defaults to verb GET', async function () {
      this.model.callWithNothing();

      const call = JSONAPIAdapter.prototype.ajax.getCall(1);
      assert.equal(call.args[1], 'GET');
    });

    test('uses the method name as the path', async function () {
      this.model.callWithNothing();

      const call = JSONAPIAdapter.prototype.ajax.getCall(1);
      assert.ok(call.args[0].match(/callWithNothing/));
    });
  });
});
