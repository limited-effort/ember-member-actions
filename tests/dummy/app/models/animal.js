import Model, { attr } from '@ember-data/model';
import { member } from 'dummy/utils/member-action';
import FakeLogger from 'dummy/helpers/fake-logger';

export default class Animal extends Model {
  @attr name;
  @attr type;
  @attr uuid;

  @member({ verb: 'POST' })
  regenerate(response) {
    this.uuid = response.data.attributes.uuid;
  }

  @member({ path: 'foo' })
  callWithPath(response) {
    new FakeLogger().log(response);
  }

  @member({ verb: 'POST' })
  callWithVerb(response) {
    new FakeLogger().log(response);
  }

  @member
  callWithNothing(response) {
    new FakeLogger().log(response);
  }
}
