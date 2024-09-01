import axios, { AxiosError } from 'axios';
import { RadarLocationResponse } from '../../../main/external-api/radar/dto';
import reverseGeocode from '../../../main/external-api/radar/radar';
import { BadRequestError, ReverseGeocodeError } from '../../../main/util/app/errors';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('ReverseGeocode', () => {
  const locationDetails = {
    country: 'United States',
    countryCode: 'US',
    countryFlag: '🇺🇸',
    state: 'New York',
    city: 'Brooklyn'
  };

  const radarLocationResponse: RadarLocationResponse = {
    addresses: [{ ...locationDetails }]
  };

  const latitude = 40.7039;
  const longitude = -73.9867;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('throws error when coordinates are invalid', async () => {
    // given
    const invalidLat = -91;
    const invalidLng = 181;

    // when and then
    await expect(reverseGeocode(invalidLat, invalidLng)).rejects.toThrow(BadRequestError);
  });

  it('successfully reverse geocodes valid coordinates', async () => {
    // given
    mockAxios.get.mockResolvedValueOnce({ data: radarLocationResponse });

    // when
    const result = await reverseGeocode(latitude, longitude);

    // then
    expect(result).toBeTruthy();
    expect(result).toEqual(radarLocationResponse);
  });

  it('throws reverse geocode error when a radar axios error occurs', async () => {
    // given
    const axiosErrorResponse: Partial<AxiosError> = {
      response: {
        data: {
          meta: {
            code: '400',
            message: 'some error message from Radar'
          }
        }
      }
    } as AxiosError;
    mockAxios.get.mockRejectedValueOnce(axiosErrorResponse);
    mockAxios.isAxiosError.mockReturnValueOnce(true);

    // when & then
    await expect(reverseGeocode(latitude, longitude)).rejects.toThrow(ReverseGeocodeError);
  });

  it('throws an error when a non-axios error occurs', async () => {
    // given
    const someError = new Error('some error');
    mockAxios.get.mockRejectedValueOnce(someError);
    mockAxios.isAxiosError.mockReturnValueOnce(false);

    try {
      // when
      await reverseGeocode(latitude, longitude);
    } catch (error: unknown) {
      // then
      expect(error).toEqual(someError);
    }
  });
});
