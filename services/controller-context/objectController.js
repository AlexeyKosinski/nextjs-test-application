import Controller from './сontroller';

export default class ObjectController extends Controller {
  constructor(state) {
    super(Object.assign({}, state));
  }

  update(state) {
    Object.assign(this._state, state);
    return this;
  }
}
