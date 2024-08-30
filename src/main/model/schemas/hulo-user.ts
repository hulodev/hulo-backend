import mongoose, { Document, Schema } from 'mongoose';

export interface HuloUserData {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  username: string;
  isEckist: boolean;
  dateOfBirth: string;
  gender: string;
  mailingListPreference: boolean;
}

export interface HuloUserModel extends HuloUserData, Document {}

const HuloUserSchema = new Schema(
  {
    userId: { type: String, required: true, index: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    username: { type: String, required: true },
    isEckist: { type: Boolean, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    mailingListPreference: { type: Boolean, required: true },
  },
  { collection: 'HuloUsers', timestamps: true }
);

const HuloUser = mongoose.model('HuloUser', HuloUserSchema);

export default HuloUser;
