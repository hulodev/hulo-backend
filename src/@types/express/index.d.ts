/**

 Declares uid as a custom type on the Express Request object,
 allowing for the auth validator to set this value.
 */
declare module 'express-serve-static-core' {
  interface Request {
    userId: string;
  }
}

export {};
