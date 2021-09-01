import {
  modelNameFromModel,
  snapshotFromModel,
  adapterFromModel,
} from './ember-data-helpers';

const buildURL = function ({ path, model }) {
  if (path && path.charAt(0) === '/') {
    return path;
  }

  const modelName = modelNameFromModel(model);
  const adapter = adapterFromModel(model);
  const snapshot = snapshotFromModel(model);
  const baseUrl = adapter.buildURL(
    modelName,
    model.get('id'),
    snapshot,
    'findRecord'
  );

  if (!path) {
    return baseUrl;
  }

  return `${baseUrl}/${path}`;
};

export { buildURL };
