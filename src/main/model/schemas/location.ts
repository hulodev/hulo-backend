import mongoose, { Document, Schema } from 'mongoose';

export interface LocationData {
  userId?: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  state: string;
  city: string;
}

export interface LocationModel extends Document, LocationData {}

const LocationSchema = new Schema(
  {
    userId: { type: String, ref: 'HuloUser', required: true, unique: true },
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    countryFlag: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true }
  },
  { collection: 'Locations', timestamps: true }
);

const Location = mongoose.model('Location', LocationSchema);

export default Location;
