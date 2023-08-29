/* This is a utility file for the dummy-person Service that currently has a function
   that transform an object of type IPerson to an Object of type CreatePersonResponse
*/

// imports the IPerson and CreatePersonResponse Interface from the specified folder.
import { IPerson } from '../models/person';
import { CreatePersonResponse } from '../models/dto';

/* creates and exports a function called toCreatePersonResponse that takes a person of type IPerson as an argument and
   returns an object of type CreatePersonResponse. This method sends back the person's name and age after it has
   successfully been saved in a database.
 */
export const toCreatePersonResponse = (person: IPerson): CreatePersonResponse => {
  return {
    name: person.name,
    age: person.age
  };
};
