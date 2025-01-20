import React from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import style from './Search.module.scss';
import { resetPage, setSearchOptions } from '../../redux/repositorySlice';
import { SortType } from '../../types/types';

function Search() {
  const { sortBy } = useAppSelector((state) => state.repositories);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    dispatch(setSearchOptions({ name, value }));
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
      <label className={style.searchLabel}>
        Sort by
        <select
          className={`input ${style.searchSelect}`}
          name="sortBy"
          value={sortBy}
          onChange={handleChange}
        >
          <option value={SortType.StarsDesc}>Most stars</option>
          <option value={SortType.StarsAsc}>Fewest stars</option>
          <option value={SortType.UpdatedDesc}>Recently updated</option>
          <option value={SortType.UpdatedAsc}>Least recently updated</option>
        </select>
      </label>
    </div>
  );
}

export default Search;
