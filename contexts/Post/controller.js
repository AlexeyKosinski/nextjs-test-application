import { ObjectControllerWithApi } from '../../services/controller-context'
import LocalTableController from '../../services/controller-context/localTableController'

export class PostController extends ObjectControllerWithApi {
  _init() {
    this.pagination = new LocalTableController({ rowsPerPage: 5 })
    this.pagination.setParentDispatch(this.dispatch.bind(this))
    this.handlers.setList = this.setList.bind(this)
    this.handlers.updatePost = this.updatePost.bind(this)
    this.handlers.pagination = this.pagination.handlers
  }

  setList(list) {
    this.pagination.update({ list })
    this.pagination.setFiltered()
  }

  async updatePost({ formData }) {
    const { id, ...d } = formData
    await this.put(`https://jsonplaceholder.typicode.com/posts/${id}`, d)
  }

}
