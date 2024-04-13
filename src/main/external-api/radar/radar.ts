import axios, { AxiosResponse, isAxiosError } from 'axios';
import { RadarLocationErrorResponse, RadarLocationResponse } from './dto';
import { BadRequestError, ReverseGeocodeError } from '../../util/app/errors';
import logger from '../../util/app/logger';
import { getValidatedEnv } from '../../util/app/util';

const baseURL = getValidatedEnv('RADAR_URL');
const apiKey = getValidatedEnv('RADAR_API_KEY');

/**
 * Method to convert coordinates to a human-readable location.
 */
const reverseGeocode = async (lat: number, lng: number): Promise<RadarLocationResponse> => {
  if (!validateCoordinates(lat, lng)) {
    throw new BadRequestError(`Invalid coordinates for latitude: ${lat}, longitude: ${lng}`);
  }

  const radarParams = {
    coordinates: `${lat},${lng}`,
    layers: 'country,state,locality'
  };

  try {
    const radarLocationInfo: AxiosResponse<RadarLocationResponse> = await axios.get(baseURL, {
      params: radarParams,
      headers: { Authorization: apiKey }
    });
    logger.debug(`Successfully converted location with coordinates: ${lat},${lng}`);
    return { addresses: radarLocationInfo.data.addresses };
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response && 'meta' in error.response.data) {
      const radarError = error.response.data as RadarLocationErrorResponse;
      const { code: radarCode, message: radarMessage } = radarError.meta;
      if (radarCode && radarMessage) {
        logger.warn(
          `A radar error occurred while reverse geocoding coordinates with lat: ${lat} and lng: ${lng}`
        );
        throw new ReverseGeocodeError(radarCode, radarMessage);
      }
    }
    logger.warn(`An unexpected error occurred while reverseGeocoding: ${error}`);
    throw error;
  }
};

const validateCoordinates = (lat: number, lng: number): boolean => {
  const isLatitudeValid = lat >= -90 && lat <= 90;
  const isLongitudeValid = lng >= -180 && lng <= 180;
  return isLatitudeValid && isLongitudeValid;
};

export default reverseGeocode;
