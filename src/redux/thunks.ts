import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams } from '../types/types';
import { getRepositories } from '../api/api';

type SearchOptions = {
  searchValue: string;
  resultsPerPage: number;
  currentPage: number;
};

export const fetchRepositories = createAsyncThunk(
  'advertisements/fetchAdvertisements',
  async (searchOptions: SearchOptions, { rejectWithValue }) => {
    const { searchValue, resultsPerPage, currentPage } = searchOptions;

    const params: QueryParams = {
      q: searchValue,
      page: currentPage.toString(),
      per_page: resultsPerPage.toString(),
    };

    try {
      const response = await getRepositories(params);
      const total = response.total_count;
      const repositories = response.items;
      return { repositories, total };
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);
