
export default class ApiClient {
  constructor(http) {
    this.http = http;
    http.initErrorResponseInterceptor(async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        // logout and redirect to /
      } else {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
        }
      }
      return Promise.reject(error);
    });
  }

  setToken(token) {
    this.http.setAuthorizationToken(token);
  }

}
