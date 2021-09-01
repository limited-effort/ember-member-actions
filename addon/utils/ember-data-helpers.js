import { getOwner } from '@ember/application';

const modelNameFromModel = function (model) {
  return model.constructor.modelName;
};

const snapshotFromModel = function (model) {
  return model._createSnapshot();
};

const adapterFromModel = function (model) {
  return getOwner(model)
    .lookup('service:store')
    .adapterFor(modelNameFromModel(model));
};

export { modelNameFromModel, snapshotFromModel, adapterFromModel };
