import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repository } from '../types/types';
import { LIMIT } from '../api/constants';
import { fetchRepositories } from './thunks';

export type RepositoriesState = {
  searchValue: string;
  resultsPerPage: number;
  currentPage: number;
  hasMore: boolean;
  repositories: Repository[];
  isLoading: boolean;
  error: string;
};

const initialState: RepositoriesState = {
  searchValue: 'javascript',
  resultsPerPage: LIMIT,
  currentPage: 1,
  hasMore: true,
  repositories: [],
  isLoading: true,
  error: '',
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchOptions: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      // state[action.payload.name] = action.payload.value;
    },
    setCurrentPage: (state) => {
      state.currentPage += 1;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepositories.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchRepositories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      if (state.currentPage > 1) {
        state.repositories = [...state.repositories, ...action.payload.repositories];
      } else {
        state.repositories = action.payload.repositories;
      }

      state.hasMore = state.repositories.length < action.payload.total;
    });
    builder.addCase(fetchRepositories.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error occured';
      state.repositories = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setSearchValue, setSearchOptions, setCurrentPage, resetPage } =
  repositoriesSlice.actions;

export default repositoriesSlice.reducer;
