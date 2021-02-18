import { ObjectControllerWithApi } from './index';

const initial = {
  total: 0,
  page: 0,
  rowsPerPage: 25,
  orderBy: 'createdAt',
  orderDir: 'desc',
  filter: { search: '' },
  columns: [],
};
const doNotCountFilters = ['search'];

export default class TableController extends ObjectControllerWithApi {
  constructor(state) {
    super(Object.assign({}, initial, state));
    this._handlers.onChangePage = this.changePage.bind(this);
    this._handlers.onChangeRowsPerPage = this.changeRowsPerPage.bind(this);
    this._handlers.onOrder = this.onOrder.bind(this);
    this._handlers.setFilter = this.setFilter.bind(this);
    this._handlers.getFiltersCount = this.getFiltersCount.bind(this);
    this._handlers.onUpdateColumns = this.setColumns.bind(this);
    this._handlers.getVisibleColumns = this.getVisibleColumns.bind(this);

    this._handlers.handleSearch = this.handleSearch.bind(this);
    this._handlers.handleFilter = this.handleFilter.bind(this);
    this._handlers.handleFilterAC = this.handleFilterAutocomplete.bind(this);
    this._handlers.handleFilterCategory = this.handleFilterCategory.bind(this);
  }

  setParentDispatch(dispatch) {
    this.parentDispatch = dispatch;
  }
  callParentDispatch() {
    this.parentDispatch && this.parentDispatch();
  }
  get limitParams() {
    const { page, rowsPerPage } = this._state;
    return {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    };
  }

  get paginationProps() {
    const { page, rowsPerPage } = this._state;
    return {
      page,
      rowsPerPage,
      onChangePage: this.changePage.bind(this),
      onChangeRowsPerPage: this.changeRowsPerPage.bind(this),
    };
  }

  get orderParams() {
    const { orderBy, orderDir = 'desc' } = this._state;
    return typeof orderBy === 'string' ? [[orderBy.includes('|') ? orderBy.split('|') : orderBy, orderDir]] : undefined;
  }

  get visibleColumns() {
    const { columns = [] } = this._state;
    return !Array.isArray(columns) ? [] : columns.filter((col) => !!col.visible);
  }

  setColumns(newColumns) {
    if (!Array.isArray(newColumns)) return;
    this.dispatch({ columns: newColumns });
  }

  getVisibleColumns() {
    return this.visibleColumns;
  }

  getFiltersCount() {
    const { filter } = this._state;
    if (!filter) return 0;

    return Object.keys(filter).reduce((cnt, filterKey) => {
      if (doNotCountFilters.includes(filterKey)) return cnt;

      if (Array.isArray(filter[filterKey])) {
        if (filter[filterKey].length > 0) cnt++;
        return cnt;
      }

      if (Boolean(filter[filterKey])) cnt++;

      return cnt;
    }, 0);
  }

  onOrder([orderBy, orderDir]) {
    this.dispatch({ orderBy, orderDir });
    this.callParentDispatch();
  }

  changePage(e, page) {
    this.dispatch({ page: +page });
    this.callParentDispatch();
  }

  changeRowsPerPage(e, value) {
    const rowsPerPage = value || e.target.value;
    this.dispatch({ rowsPerPage: +rowsPerPage, page: 0 });
    this.callParentDispatch();
  }

  setFilter(newFilter) {
    const { filter } = this._state;
    this.dispatch({ filter: { ...filter, ...newFilter }, page: 0 });
  }

  handleSearch(value, name = 'search') {
    this.setFilter({ [String(name)]: value });
  }

  handleFilter(e) {
    const { name, value, checked, type } = e.target;
    this.setFilter({ [String(name)]: type === 'checkbox' ? checked : value });
  }

  handleFilterAutocomplete(name, value) {
    this.setFilter({ [String(name)]: value });
  }

  handleFilterCategory(name, value) {
    const categoryNum = Number(String(name).split('-')[1] || 1);
    if (!categoryNum) return;

    const newState = { [`category${categoryNum}`]: value };
    for (let i = categoryNum + 1; i <= 4; i++) {
      newState[`category${i}`] = null;
    }

    this.setFilter(newState);
  }
}
