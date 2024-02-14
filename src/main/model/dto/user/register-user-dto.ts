import { Request } from 'express';
import { GetLocationResponse } from './get-location-dto';

export interface RegisterUserRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    username: string;
    isEckist: boolean;
    dateOfBirth: string;
    gender: string;
    mailingListPreference: boolean;
    location: GetLocationResponse;
  };
}

export interface RegisterUserResponse {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  isEckist: boolean;
  dateOfBirth: string;
  gender: string;
  mailingListPreference: boolean;
  location: GetLocationResponse;
}
