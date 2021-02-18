import ApiError from './apiError';

export default class HttpAdapter {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async processResponse(method, path, ...args) {
    try {
      const { data } = await method(path, ...args);
      return data;
    } catch (e) {
      throw e && e.isApiError ? e : new ApiError(e, path);
    }
  }

  initErrorResponseInterceptor(handler) {
    this.axiosInstance.interceptors.response.use((response) => response, handler);
  }

  get axios() {
    return this.axiosInstance;
  }

  setAuthorizationToken(token) {
    if (!token) {
      delete this.axiosInstance.defaults.headers.Authorization;
    } else {
      this.axiosInstance.defaults.headers = {
        ...this.axiosInstance.defaults.headers,
        Authorization: token,
      };
    }
  }

  delete(path, config) {
    return this.processResponse(this.axios.delete, path, config);
  }

  get(path, params, config) {
    return this.processResponse(this.axios.get, path, { ...config, params });
  }

  patch(path, data, config) {
    return this.processResponse(this.axios.patch, path, data, config);
  }

  post(path, data, config) {
    return this.processResponse(this.axios.post, path, data, config);
  }

  put(path, data, config) {
    return this.processResponse(this.axios.put, path, data, config);
  }

  repeatRequest(config) {
    return this.axios(config);
  }
}
