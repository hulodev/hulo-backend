import { Request } from 'express';
import { GenderType } from './constants';

export interface RegisterUserRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    username: string;
    isEckist: boolean;
    dateOfBirth: string;
    gender: GenderType;
    mailingListPreference: boolean;
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
}
