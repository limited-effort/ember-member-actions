import Model, { attr } from '@ember-data/model';
import { member } from 'dummy/utils/member-action';
import FakeLogger from 'dummy/helpers/fake-logger';

export default class Animal extends Model {
  @attr name;
  @attr type;
  @attr uuid;

  logger;

  constructor() {
    super(...arguments);
    this.logger = new FakeLogger();
  }

  set logger(value) {
    this.logger = value;
  }

  @member({ verb: 'POST' })
  regenerate(response) {
    this.uuid = response.data.attributes.uuid;
  }

  @member({ path: 'foo' })
  callWithPath(response) {
    this.logger.log(response);
  }

  @member({ verb: 'POST' })
  callWithVerb(response) {
    this.logger.log(response);
  }

  @member
  callWithNothing(response) {
    this.logger.log(response);
  }
}
