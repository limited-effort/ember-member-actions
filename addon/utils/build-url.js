// Copyright 2021 Matthew Howes

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
