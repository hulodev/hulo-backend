// This file controls the handling of operations associated with the dummyPerson Service, specifically a Person.

// imports the CreatePersonRequest and CreatePersonResponse interface from the specified folder.
import {
  CreatePersonRequest,
  CreatePersonResponse,
  GetAgeRequest,
  GetAgeResponse
} from '../models/dto';
// imports the toCreatePersonResponse function from the specified folder
import { toCreatePersonResponse } from '../util/util';
// imports the method that handles the logic to create a person from the service/person folder
import executeCreatePerson from '../services/person/create-person';
// imports the method that handles the logic to get a persons age from the service/person folder
import executeGetAge from '../services/person/get-age';

/**
 * method receives a request and response object and returns a void promise. This method calls the executeCreatePerson
 * method on personService which saves a person's name and age to a collection in mongodb. if the operation was
 * successful, it sends a 201 response and returns the CreatePersonResponse object.
 * if it wasn't successful, an error with a 500 response will be propagated by the error handler middleware.
 */
const createPerson = async (req: CreatePersonRequest): Promise<CreatePersonResponse> => {
  const { name, age } = req.body;
  const person = await executeCreatePerson(name, age);
  return toCreatePersonResponse(person);
};

/**
 * Method to get the age of a dummy person.
 * @param req containing the person's id.
 * @returns the age of the person.
 */
const getAge = async (req: GetAgeRequest): Promise<GetAgeResponse> => {
  const { personId } = req.body;
  const age = await executeGetAge(personId);
  return { age };
};

// exports all specified methods in person-controller
export { createPerson, getAge };
