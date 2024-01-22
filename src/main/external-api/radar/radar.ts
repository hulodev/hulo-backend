import axios, { AxiosResponse, isAxiosError } from 'axios';
import { RadarLocationErrorResponse, RadarLocationResponse } from './dto';
import { BadRequestError, ReverseGeocodeError } from '../../util/app/errors';
import logger from '../../util/app/logger';
import { getValidatedEnv } from '../../util/app/util';

const baseURL = getValidatedEnv('RADAR_URL');
const apiKey = getValidatedEnv('RADAR_API_KEY');

const validateCoordinates = (lat: number, lng: number): boolean => {
  // latitude should be within [-90, 90] and longitude within [-180, 180]
  return !(lat < -90 || lat > 90 || lng < -180 || lng > 180);
};

/**
 * Method to convert coordinates to a human-readable address.
 */
const reverseGeocode = async (lat: number, lng: number): Promise<RadarLocationResponse> => {
  // validate input
  if (!validateCoordinates(lat, lng)) {
    throw new BadRequestError(`Invalid coordinates for latitude: ${lat}, longitude: ${lng}`);
  }

  // prepare radar request input
  const params = {
    coordinates: `${lat},${lng}`,
    layers: 'country,state,locality'
  };

  // make request to radar api
  try {
    const radarLocationInfo: AxiosResponse<RadarLocationResponse> = await axios.get(baseURL, {
      params,
      headers: { Authorization: apiKey }
    });
    logger.debug(`Successfully converted location with coordinates: ${lat},${lng}`);

    return { addresses: radarLocationInfo.data.addresses };
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response) {
      // if radar throws an error, axios will set a meta object in the response
      if ('meta' in err.response.data) {
        const radarError = err.response.data as RadarLocationErrorResponse;
        const { code: radarCode, message: radarMessage } = radarError.meta;

        if (radarCode && radarMessage) {
          logger.warn(
            `A radar error occurred while reverse geocoding coordinates with lat: ${lat} and lng: ${lng}`
          );
          throw new ReverseGeocodeError(radarCode, radarMessage);
        }
      }
      logger.warn(`An axios error occurred while reverseGeocoding: ${err}`);
    }
    logger.warn(`An unexpected error occurred while reverseGeocoding: ${err}`);

    // throw all other non-radar errors
    throw err;
  }
};

export default reverseGeocode;
