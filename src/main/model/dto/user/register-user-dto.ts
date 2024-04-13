import { Request } from 'express';
import { LocationData } from '../../schemas/location';

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
    location: LocationData;
  };
}

export interface RegisterUserResponse {
  message: string;
}
