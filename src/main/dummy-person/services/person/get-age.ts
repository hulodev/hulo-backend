import Person, { IPerson } from '../../models/person';
import { NotFoundError } from '../../../utils/errors';

/**
 * Handles the logic to retrieve the age of a person.
 * @param personId the id of the person.
 * @throws NotFoundError if the person was not found.
 */
const executeGetAge = async (personId: string): Promise<number> => {
  const person: IPerson | null = await Person.findById(personId);

  if (person !== null) {
    return person.age;
  } else {
    throw new NotFoundError(`Person: ${personId} was not found!`);
  }
};

export default executeGetAge;
