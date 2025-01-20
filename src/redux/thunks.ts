import { createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParams, SortType } from '../types';
import { getRepositories } from '../api/api';
import { LIMIT } from '../api/constants';

type SearchOptions = {
  searchValue: string;
  sortBy: SortType;
  currentPage: number;
};

export const fetchRepositories = createAsyncThunk(
  'advertisements/fetchAdvertisements',
  async (searchOptions: SearchOptions, { rejectWithValue }) => {
    let { searchValue, sortBy, currentPage } = searchOptions;

    const [sort, order] = sortBy.split('-');

    if (!searchValue) {
      searchValue = 'javascript';
    }

    const params: QueryParams = {
      q: searchValue,
      sort,
      order,
      page: currentPage.toString(),
      per_page: LIMIT.toString(),
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
