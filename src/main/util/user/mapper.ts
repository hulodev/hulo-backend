import { GetLocationResponse } from '../../model/dto/user/get-location-dto';
import { RadarLocationResponse } from '../../external-api/radar/dto';

export const toGetLocationResponse = (
  radarLocation: RadarLocationResponse
): GetLocationResponse => {
  // radar places the address properties as a single item in the address array
  const address = radarLocation.addresses[0];
  return {
    country: address.country,
    countryCode: address.countryCode,
    countryFlag: address.countryFlag,
    state: address.state,
    city: address.city
  };
};
