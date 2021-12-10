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

import { adapterFromModel } from './ember-data-helpers';
import { buildURL } from './build-url';

const _memberAction = function (
  object,
  property,
  descriptor,
  { path, verb = 'GET' } = {}
) {
  const action = function () {
    const url = buildURL({
      path: path || property,
      model: this,
    });
    const httpVerb = verb.toUpperCase();

    let payload = {};

    if (httpVerb == 'POST' || httpVerb == 'PUT' || httpVerb == 'PATCH') {
      payload = this.serialize();
    }

    return adapterFromModel(this)
      .ajax(url, httpVerb, payload)
      .then((resp) => {
        if (descriptor.value) {
          descriptor.value.call(this, resp);
        }
      });
  };

  return {
    ...descriptor,
    value: action,
    writable: false,
  };
};

const member = function (...args) {
  const [object, property, descriptor] = args;
  if (
    args.length == 3 &&
    typeof object == 'object' &&
    object !== null &&
    typeof property == 'string' &&
    typeof descriptor == 'object' &&
    descriptor !== null
  ) {
    return _memberAction(object, property, descriptor);
  } else {
    const { path, verb } = object;
    return function (object, property, descriptor) {
      return _memberAction(object, property, descriptor, {
        path,
        verb,
      });
    };
  }
};

export { member };
