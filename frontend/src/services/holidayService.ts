import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Holiday {
  id: number;
  name: string;
  date: string;
  type: 'REGULAR' | 'WORK';
  countryCode: string;
}

export interface Country {
  code: string;
  name: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const holidayService = {
  getCountries: async (): Promise<Country[]> => {
    const response = await apiClient.get<Country[]>('/countries');
    return response.data;
  },

  getHolidays: async (
    countryCode: string,
    startDate: string,
    endDate: string,
    holidayType?: string
  ): Promise<Holiday[]> => {
    const params: Record<string, string> = {
      country: countryCode,
      startDate,
      endDate,
    };
    if (holidayType) {
      params.holidayType = holidayType;
    }
    const response = await apiClient.get<Holiday[]>('/holidays', { params });
    return response.data;
  },
};
