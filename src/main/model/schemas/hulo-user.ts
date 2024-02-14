import mongoose, { Document, Schema } from 'mongoose';
import { GetLocationResponse } from '../dto/user/get-location-dto';

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
  location: GetLocationResponse;
}

export interface HuloUserModel extends HuloUserData, Document {}

const LocationSchema = new Schema({
  country: { type: String, required: true },
  countryCode: { type: String, required: true },
  countryFlag: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true }
});

const HuloUserSchema = new Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    username: { type: String, required: true },
    isEckist: { type: Boolean, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    mailingListPreference: { type: Boolean, required: true },
    location: { type: LocationSchema, required: true }
  },
  { collection: 'HuloUsers', timestamps: true }
);

const HuloUser = mongoose.model('HuloUser', HuloUserSchema);

export default HuloUser;
