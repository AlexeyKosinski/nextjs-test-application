import { ObjectControllerWithApi } from './index'

export default class LocalTableController extends ObjectControllerWithApi {
  constructor(state) {
    super(Object.assign({ total: 0, page: 0, rowsPerPage: 25, filter: {} }, state))

    this.handlers.onChangePage = this.changePage.bind(this)
    this.handlers.onChangeRowsPerPage = this.changeRowsPerPage.bind(this)
    this.handlers.setFilter = this.setFilter.bind(this)
    this.handlers.getFiltered = this.getFiltered.bind(this)
    this.handlers.setFiltered = this.setFiltered.bind(this)
    this.handlers.clearFilter = this.clearFilter.bind(this)
    this.handlers.getPaginationProps = this.getPaginationProps.bind(this)
    this.handlers.onOrder = this.onOrder.bind(this)
    this.applyFilter = () => {return true}
  }

  get limitParams() {
    const { page, rowsPerPage } = this._state
    return {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    }
  }

  get orderParams() {
    const { orderBy, orderDir = 'asc' } = this._state
    return orderBy ? [[orderBy, orderDir]] : undefined
  }

  setFiltered() {
    const { list = [] } = this.state
    const filtered = list.filter((i) => this.applyFilter(i))
    this.dispatch({
      total: filtered.length,
      filtered,
    })
    this.callParentDispatch()
  }

  setParentDispatch(dispatch) {
    this.parentDispatch = dispatch
  }

  setApplyFilter(applyFilter) {
    this.applyFilter = applyFilter
  }

  callParentDispatch() {
    this.parentDispatch && this.parentDispatch()
  }

  onOrder([orderBy, orderDir]) {
    this.dispatch({ orderBy, orderDir })
    this.callParentDispatch()
  }

  changePage = (e, page) => {
    this.dispatch({ page: +page })
    this.callParentDispatch()
  }

  changeRowsPerPage = (e) => {
    const rowsPerPage = e.target.value
    this.dispatch({ rowsPerPage: +rowsPerPage, page: 0 })
    this.callParentDispatch()
  }

  sliceFiltered() {
    const { page, rowsPerPage, filtered = [] } = this.state
    return filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  getFiltered() {
    return this.state.filtered || []
  }

  getPaginationProps() {
    const { filtered, total, rowsPerPage, page } = this.state
    return {
      filtered: this.sliceFiltered(filtered),
      count: total,
      rowsPerPageOptions: [3, 5, 10, 25],
      rowsPerPage,
      page,
      onChangePage: this.changePage,
      onChangeRowsPerPage: this.changeRowsPerPage,
    }
  }

  clearFilter() {
    this.dispatch({
      filter: {},
    })
  }

  setFilter(filter) {
    this.dispatch({
      filter: {
        ...this.state.filter,
        ...filter,
      },
    })
  }
}
