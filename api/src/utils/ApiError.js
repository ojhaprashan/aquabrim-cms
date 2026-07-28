// Lightweight error type that carries an HTTP status code.
// Throw `new ApiError(404, 'Not found')` anywhere and the error middleware
// will turn it into a clean JSON response.
export default class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}
