import { ObjectControllerWithApi } from '../../services/controller-context'
import LocalTableController from '../../services/controller-context/localTableController'

export class UserController extends ObjectControllerWithApi {
  _init() {
    this.pagination = new LocalTableController({ rowsPerPage: 3 })
    this.pagination.setParentDispatch(this.dispatch.bind(this))
    this.handlers.setList = this.setList.bind(this)
    this.handlers.updateUser = this.updateUser.bind(this)
    this.handlers.pagination = this.pagination.handlers
  }

  setList(list) {
    this.pagination.update({ list })
    this.pagination.setFiltered()
  }

  async updateUser({ formData }) {
    const { id, ...d } = formData
    const data = {
      name: d.name,
      username: d.username,
      email: d.email,
      phone: d.phone,
      website: d.website,
      company: {
        name: d.companyName,
        catchPhrase: d.companyCatchPhrase,
        bs: d.companyBs,
      },
      address: {
        city: d.addressCity,
        street: d.addressStreet,
        suite: d.addressSuite,
        zipcode: d.addressZipCode,
        geo: {
          lat: d.addressLat,
          lng: d.addressLng,
        },
      },

    }
    await this.put(`https://jsonplaceholder.typicode.com/users/${id}`, data)
  }

}
