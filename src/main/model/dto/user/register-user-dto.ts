import { Request } from 'express';
import { LocationData } from '../../schemas/location';
import { BadRequestError } from '../../../util/app/errors';
import { Gender } from '../../constants/user-constants';

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

export const validateRegisterUserRequestParams = (req: RegisterUserRequest): void => {
  const { gender } = req.body;
  if (!gender || !gender.trim()) {
    throw new BadRequestError(`Invalid gender: ${gender}`);
  }
  if (!Object.values(Gender).includes(gender.toLowerCase() as Gender)) {
    throw new BadRequestError(
      `Invalid gender: ${gender} - supported values: ${Object.values(Gender).join(', ')}`
    );
  }
};
