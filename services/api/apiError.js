export const API_ERROR_CODES = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

export default class ApiError extends Error {
  name = 'ApiError';

  constructor(originalError) {
    super(originalError.message);
    this.originalError = originalError;
  }

  isResponseStatus(status) {
    return Boolean(this.originalError && this.originalError.response && this.originalError.response.status === status);
  }

  get isApiError() {
    return true;
  }

  get code() {
    return this.originalError && this.originalError.code;
  }

  get response() {
    return this.originalError && this.originalError.response;
  }

  get data() {
    return (this.response && this.response.data) || this.response;
  }

  get axiosConfig() {
    return this.originalError && this.originalError.config;
  }

  get isNotFound() {
    return this.isResponseStatus(API_ERROR_CODES.NOT_FOUND);
  }

  get isUnauthorized() {
    return this.isResponseStatus(API_ERROR_CODES.UNAUTHORIZED);
  }
}
