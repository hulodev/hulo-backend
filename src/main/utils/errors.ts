/**
 * An abstract base error which all custom hulo errors will extend.
 */
abstract class HuloError extends Error {
  status: number;
  // protect the constructor to prevent direct instantiation of the class.
  protected constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/* http errors - add http errors below */

class BadRequestError extends HuloError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class NotFoundError extends HuloError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

class UnauthorizedError extends HuloError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

/* custom errors - add custom errors below */

class UndefinedEnvError extends HuloError {
  constructor(message = 'ENV Variable is undefined') {
    super(500, message);
  }
}

export { HuloError, BadRequestError, NotFoundError, UnauthorizedError, UndefinedEnvError };
