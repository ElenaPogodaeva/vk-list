import style from './RepositoryItem.module.scss';
import { Repository } from '../../types/types';
import starIcon from '../../assets/star.svg';

type RepositoryItemProps = {
  repository: Repository;
};

export function RepositoryItem({ repository }: RepositoryItemProps) {
  const { full_name, description, language, stargazers_count, updated_at, html_url, owner } =
    repository;

  return (
    <div className={style.item}>
      <div className={style.itemHeader}>
        <a href={owner.html_url} target="_blank" rel="noreferrer">
          <img src={owner.avatar_url} alt="avatar" className={style.itemAvatar} />
        </a>
        <a href={html_url} target="_blank" rel="noreferrer">
          <h2 className={style.itemTitle}>{full_name}</h2>
        </a>
      </div>
      <p>{description}</p>
      <ul className={style.itemInfo}>
        <li>{language}</li>
        <li className={style.star}>
          <img src={starIcon} alt="Star" />
          {stargazers_count}
        </li>
        <li>Updated on {new Date(updated_at).toLocaleDateString()}</li>
      </ul>
      <div className={style.itemBtns}>
        <button type="button" className={`button ${style.itemBtn}`}>
          Edit
        </button>
        <button type="button" className={`button ${style.itemBtn}`}>
          Delete
        </button>
      </div>
    </div>
  );
}
