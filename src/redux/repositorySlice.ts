import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepositoryFormValues, Repository, SortType } from '../types';
import { fetchRepositories } from './thunks';

export type RepositoriesState = {
  searchValue: string;
  currentPage: number;
  sortBy: SortType;
  hasMore: boolean;
  repositories: Repository[];
  isLoading: boolean;
  error: string;
  [key: string]: string | SortType | number | boolean | Repository[];
};

const initialState: RepositoriesState = {
  searchValue: 'javascript',
  currentPage: 1,
  sortBy: SortType.StarsDesc,
  hasMore: true,
  repositories: [],
  isLoading: true,
  error: '',
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setSearchOptions: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      state[action.payload.name] = action.payload.value;
    },
    setCurrentPage: (state) => {
      state.currentPage += 1;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
    updateRepository(
      state,
      action: PayloadAction<{
        id: string;
        updatedValues: RepositoryFormValues;
      }>
    ) {
      const { id, updatedValues } = action.payload;

      const repository = state.repositories.find((item) => item.id === id) as Repository;

      repository.full_name = updatedValues.full_name;
      repository.description = updatedValues.description;
      repository.language = updatedValues.language;
    },
    deleteRepository(state, action) {
      state.repositories = state.repositories.filter((item) => item.id !== action.payload);
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
export const { setSearchOptions, setCurrentPage, resetPage, updateRepository, deleteRepository } =
  repositoriesSlice.actions;

export default repositoriesSlice.reducer;
