'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { V1Addon } = require('@embroider/compat');
const { forceIncludeModule } = require('@embroider/compat/src/compat-utils');

class EmberDataCompatAdapter extends V1Addon {
  get packageMeta() {
    return forceIncludeModule(super.packageMeta, './-private');
  }
}

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    compatAdapters: new Map([
      ['@ember-data/model', EmberDataCompatAdapter],
      ['@ember-data/record-data', EmberDataCompatAdapter],
    ]),
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticComponents: true,
    staticHelpers: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
