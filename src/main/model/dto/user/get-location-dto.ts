import { Request } from 'express';

export interface GetLocationRequest extends Request {
  body: {
    latitude: number;
    longitude: number;
  };
}

export interface GetLocationResponse {
  country: string;
  countryCode: string;
  countryFlag: string;
  state: string;
  city: string;
}
