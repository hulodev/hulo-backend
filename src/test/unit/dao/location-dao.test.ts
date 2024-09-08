import Location from '../../../main/model/schemas/location';
import { saveLocation } from '../../../main/dao/location-dao';

const saveMethod = jest.fn();

jest.mock('../../../main/model/schemas/location', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: saveMethod
    };
  });
});

const userId = '3555';
const country = 'United States';
const countryCode = 'US';
const countryFlag = '🇺🇸';
const state = 'New York';
const city = 'Brooklyn';

const locationModel = {
  userId,
  country,
  countryCode,
  countryFlag,
  state,
  city
};

describe('saveLocation', () => {
  it('should save a new location document', async () => {
    // given
    saveMethod.mockResolvedValue(locationModel);
    const location = new Location(locationModel);

    // when
    const result = await saveLocation(location);

    // then
    expect(result).toEqual(locationModel);
    expect(location.save).toHaveBeenCalledTimes(1);
  });

  it('should throw error on insert failure', async () => {
    // given
    const location = new Location(locationModel);
    const error = new Error('error');
    saveMethod.mockRejectedValue(error);

    // when & then
    await expect(saveLocation(location)).rejects.toThrow(error);
  });
});
