// This file contains the specific service associated with a Person.

// imports the Person model and IPerson interface from the specified location
import Person, { IPerson } from '../models/person';
// imports the logger class from the specified location
import logger from '../../utils/logger';

/* create a PersonService class that contains a createPerson method. The method takes a name and age argument of type
   string and number respectively, and returns a promise of type IPerson. This method creates a new person/document
   using the person model and specifies the name and age property. The method then saves the document, and if successful
   logs that the person has been saved successfully. Then the data returned from .save() is returned from the method.
 */
export class PersonService {
  public async createPerson(name: string, age: number): Promise<IPerson> {
    logger.info(`creating Person with name: ${name} and age: ${age}`);
    const person: IPerson = new Person({
      name,
      age
    });

    const savedPerson = await person.save();
    logger.info('person has been successfully saved');

    return savedPerson;
  }
}
