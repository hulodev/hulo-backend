export interface RadarLocationResponse {
  addresses: {
    country: string;
    countryCode: string;
    countryFlag: string;
    state: string;
    city: string;
  }[];
}

export interface RadarLocationErrorResponse {
  meta: {
    code: number;
    message: string;
  };
}
