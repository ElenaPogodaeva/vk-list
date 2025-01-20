import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRepositories } from './redux/thunks';
import { setCurrentPage } from './redux/repositorySlice';
import { RepositoryList } from './components/RepositoryList/RepositoryList';
import { Search } from './components/Search/Search';

function App() {
  const { repositories, searchValue, currentPage, sortBy, hasMore, isLoading, error } =
    useAppSelector((state) => state.repositories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRepositories({ searchValue, currentPage, sortBy }));
  }, [searchValue, currentPage, sortBy]);

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
      <Search />
      <RepositoryList repositories={repositories} />
      {isLoading && <p className="message">Loading...</p>}
      {error && <p className="message">Error occured</p>}
    </div>
  );
}

export default App;
