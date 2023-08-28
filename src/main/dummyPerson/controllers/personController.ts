//This file controls the handling of operations associated with the dummyPerson Service, specifically a Person.

// imports the Response type/interface from express
import { Response } from 'express';
// imports the PersonService Class from the specified folder
import { PersonService } from '../services/personService';
// imports the CreatePersonRequest interface from the specified folder.
import { CreatePersonRequest } from '../models/dto';
// imports the toCreatePersonResponse function from the specified folder
import { toCreatePersonResponse } from '../util/util';

// defines the PersonController class
class PersonController {
  // defines a private property called personService that saves an instance of the PersonService class
  private personService = new PersonService();

  /* defines a public async method called createPerson that receives a request and response object
  and returns a void promise. This method calls the createPerson method on personService which saves a person's
  name and age to a collection in mongodb. if the operation was successful, it sends a 201 response with a message and a data object.
  if it wasn't successful, it sends a 500 response with the error message.
   */
  public createPerson = async (req: CreatePersonRequest, res: Response): Promise<void> => {
    const { name, age } = req.body;
    try {
      const person = await this.personService.createPerson(name, age);

      res.status(201).json({
        message: 'Person added successfully',
        data: toCreatePersonResponse(person)
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

// exports PersonController class as the default export.
export default PersonController;
