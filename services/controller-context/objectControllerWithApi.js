import ObjectController from './objectController'
import api from '../api'

export default class ObjectControllerWithApi extends ObjectController {
  constructor(state) {
    super(state)
    this._api = api

    this.post = this.apiMethod.bind(this, 'post')
    this.get = this.apiMethod.bind(this, 'get')
    this.delete = this.apiMethod.bind(this, 'delete')
    this.put = this.apiMethod.bind(this, 'put')

  }

  async apiMethod(method, url, data) {
    this.dispatch({ pending: true })
    try {
      return await this._api.http[method](url, data)
    } catch (e) {
      this.emitError(e)
      throw e
    } finally {
      this.dispatch({ pending: false })
    }
  }
}
