# ember-member-actions

![build](https://github.com/limited-effort/ember-member-actions/actions/workflows/main.yml/badge.svg) [![maintainability](https://api.codeclimate.com/v1/badges/63b6b0509f3ac6fd82dc/maintainability)](https://codeclimate.com/github/limited-effort/ember-member-actions/maintainability)

Allow non-standard Member RESTful actions.

Standard Member CRUD rest actions are super simple in Ember

```javascript 
GET /animals/1
PUT /animals/1
...
```

But more complex actions like

```javascript
PUT /animals/1/favorite
```

Are a little more difficult.  This package aims to simplify these interactions in a modern way.

##### \*NOTE\*

This package **does not** include collection actions like

```javascript
GET /animals/arctic
```

Instead we are working on an additional package that will handle this functionality more like a service. 


## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


## Installation

```
ember install ember-member-actions
```

## Usage

To add a member action to your models just add the `@member` decorator to your function.

### Quickstart

```javascript
import Model, { attr } from '@ember-data/model';
import { member } from 'dummy/utils/member-action';

export default class Animal extends Model {
  @attr name;
  @attr type;
  @attr uuid;

  @member({ verb: 'PUT' })
  favorite(response) {
    // ... do something with server response
  }
}

...

const animal = this.store.findRecord('animal', 1);
animal.favorite() // => calls PUT /animals/1/favorite

```

### Verb

Default: POST

You can set the HTTP VERB you want to using the `verb` option

```javascript
@member(verb: 'PUT')
modelFunction(response) {
  ...
}
```

### Path

Default: Function name

The path defaults to the name of the function.  If you want to change the path you can use the `path` option.  This will always generate a url relative to the model path.

```javascript
@member(path: 'star')
favorite(response) {
  ...
}

animal.star() // => POST /animals/1/star
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

Bug reports and pull requests are welcome on GitHub at https://github.com/limited-effort/ember-member-actions. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/limited-effort/snfoil-context/blob/main/CODE_OF_CONDUCT.md).

## License

The pacakge is available as open source under the terms of the [Apache 2 License](https://opensource.org/licenses/Apache-2.0).

## Code of Conduct

Everyone interacting in the Snfoil::Context project's codebases, issue trackers, chat rooms, and mailing lists is expected to follow the [code of conduct](https://github.com/limited-effort/ember-member-actions/blob/main/CODE_OF_CONDUCT.md).
