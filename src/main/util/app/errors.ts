/**
 * An abstract base error which all custom hulo errors will extend.
 */
export abstract class HuloError extends Error {
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

export class BadRequestError extends HuloError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

// todo: uncomment when ready to use this error in code
// export class NotFoundError extends HuloError {
//   constructor(message = 'Not Found') {
//     super(404, message);
//   }
// }

export class UnauthorizedError extends HuloError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

/* custom errors - add custom errors below */

export class UndefinedEnvError extends HuloError {
  constructor(message: string) {
    super(500, message);
  }
}

export class ReverseGeocodeError extends HuloError {
  constructor(status: number, message: string) {
    super(status, message);
  }
}
