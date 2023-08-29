// This file contains the create person service method associated with a Person.

// imports the Person model and IPerson interface from the specified location
import Person, { IPerson } from '../../models/person';
// imports the logger class from the specified location
import logger from '../../../utils/logger';
import { BadRequestError } from '../../../utils/errors';

/**
 * The method takes a name and age argument of type string and number respectively, and returns a promise of type
 * IPerson. This method creates a new person/document using the person model and specifies the name and age property.
 * The method then saves the document, and if successful logs that the person has been saved successfully.
 * Then the data returned from .save() is returned from the method.
 */
const executeCreatePerson = async (name: string, age: number): Promise<IPerson> => {
  // validate age and throw a bad request error if invalid
  if (age < 18 && age > 105) {
    throw new BadRequestError(`invalid age: ${age}`);
  }

  logger.info(`creating Person with name: ${name} and age: ${age}`);
  const person: IPerson = new Person({
    name,
    age
  });

  const savedPerson = await person.save();
  logger.info('person has been successfully saved');

  return savedPerson;
};

export default executeCreatePerson;
