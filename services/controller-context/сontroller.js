/**
 * @class Controller
 * @typedef Controller
 * @property _state
 * @property _handlers
 */
export default class Controller {
  constructor(state) {
    this._state = state
    this._handlers = {}
    this._dispatch = () => undefined
    this._errorHandler = () => undefined
    this._init()
  }

  /** @override */
  _init() {}

  get state() {
    return this._state
  }

  get handlers() {
    return this._handlers
  }

  onError(handler) {
    this._errorHandler = typeof handler === 'function' ? handler : this._errorHandler
  }

  emitError(err) {
    this._errorHandler(err instanceof Error ? err : new Error(err))
    return this
  }

  onDispatch(dispatch) {
    this._dispatch = typeof dispatch === 'function' ? dispatch : this._dispatch
  }

  dispatch(state = undefined) {
    if (state) this.update(state)
    this._dispatch(this.valueOf())
    return this
  }

  valueOf() {
    return { state: this._state, ...this._handlers }
  }

  update(state) {
    this._state = state
    return this
  }
}
