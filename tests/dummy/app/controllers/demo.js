import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DemoController extends Controller {
  @action
  click(model) {
    model.regenerate();
  }
}
