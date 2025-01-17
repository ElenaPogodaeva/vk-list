import React from 'react';

import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import style from './Search.module.scss';
import { resetPage, setSearchOptions, setSearchValue } from '../../redux/repositorySlice';
import { SortType } from '../../types/types';

export function Search() {
  const { resultsPerPage, searchValue, sortBy } = useAppSelector((state) => state.repositories);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    //dispatch(setSearchOptions({ name, value }));
    dispatch(setSearchValue(value));
    dispatch(resetPage());
  };

  const debouncedChange = debounce(handleChange, 500);

  return (
    <div className={style.searchOptions}>
      <input
        type="text"
        className={`input ${style.searchInput}`}
        name="searchValue"
        onChange={debouncedChange}
        placeholder="Search"
      />
    </div>
  );
}
