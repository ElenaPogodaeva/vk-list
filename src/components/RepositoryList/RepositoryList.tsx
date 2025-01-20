import { Repository } from '../../types/types';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import style from './RepositoryList.module.scss';

type RepositoryListProps = {
  repositories: Repository[];
};

function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <div className={style.cards}>
      {Boolean(repositories.length) &&
        repositories.map((item) => <RepositoryItem key={item.id} repository={item} />)}
    </div>
  );
}

export default RepositoryList;
