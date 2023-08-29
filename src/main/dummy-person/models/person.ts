// This file creates the database model for the dummy-person service.

// imports mongoose, the document interface and schema from the mongoose module.
import mongoose, { Document, Schema } from 'mongoose';

/* creates a new interface called IPerson that inherits from the Document class. The IPerson interface
   adds three additional properties(name and age).
 */
export interface IPerson extends Document {
  name: string;
  age: number;
}

/* creates a new PersonSchema from the Schema class and specifies the structure that the data in the mongodb collection
   will have. Documents made with this Schema will have name and age properties. Documents created with this
   schema will also be saved in a collection called dummyPeople and add timestamps the document was created or updated.
*/
const PersonSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true }
  },
  { collection: 'dummyPeople', timestamps: true }
);

/* creates a mongoose model called Person, using the PersonSchema. Documents created from this model will
   follow the structure defined in the IPerson Interface.
 */
export default mongoose.model<IPerson>('Person', PersonSchema);
