// This file specifies the structure of objects that will be transferred across processes or systems.

// import the Request interface from express
import { Request } from 'express';

/* creates and exports a new interface called createPerson Request that inherits from the Request interface.
    redefine the body property to have just name and age of type string and number respectively.
 */
export interface CreatePersonRequest extends Request {
  body: {
    name: string;
    age: number;
  };
}

// creates and export a new interface that has property name and age of type string and number respectively.
export interface CreatePersonResponse {
  name: string;
  age: number;
}

export interface GetAgeRequest extends Request {
  body: {
    personId: string;
  };
}

export interface GetAgeResponse {
  age: number;
}
