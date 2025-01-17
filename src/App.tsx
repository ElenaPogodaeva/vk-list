import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRepositories } from './redux/thunks';
import { setCurrentPage } from './redux/repositorySlice';
import { RepositoryList } from './components/RepositoryList/RepositoryList';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const { repositories, searchValue, currentPage, resultsPerPage, hasMore, isLoading, error } =
    useAppSelector((state) => state.repositories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRepositories({ searchValue, resultsPerPage, currentPage }));
  }, [searchValue, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isLoading &&
        hasMore &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 20
      ) {
        dispatch(setCurrentPage());
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div className="page">
      <SearchBar />
      <RepositoryList repositories={repositories} />
      {isLoading && <div>Loading...</div>}
      {error && <p>Error occured</p>}
    </div>
  );
}

export default App;
