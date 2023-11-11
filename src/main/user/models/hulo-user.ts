import mongoose, { Document, Schema } from 'mongoose';

export interface HuloUserModel extends Document {
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

const HuloSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    username: { type: String, required: true },
    isEckist: { type: Boolean, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    mailingListPreference: { type: Boolean, required: true }
  },
  { collections: 'HuloUsers', timestamps: true }
);

export default mongoose.model<HuloUserModel>('HuloUser', HuloSchema);
