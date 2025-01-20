import { QueryParams } from '../types';
import { BASE_URL } from './constants';

export const getRepositories = async (params: QueryParams) => {
  try {
    const config = {
      method: 'GET',
      headers: {},
    };

    const url = new URL(BASE_URL);

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.href, config);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
