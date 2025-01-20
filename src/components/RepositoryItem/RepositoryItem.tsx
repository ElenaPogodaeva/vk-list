import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import style from './RepositoryItem.module.scss';
import { Repository, RepositoryFormValues } from '../../types';
import starIcon from '../../assets/star.svg';
import Modal from '../Modal/Modal';
import RepositoryForm from '../RepositoryForm/RepositoryForm';
import { deleteRepository, updateRepository } from '../../redux/repositorySlice';
import { useAppDispatch } from '../../redux/hooks';

type RepositoryItemProps = {
  repository: Repository;
};

function RepositoryItem({ repository }: RepositoryItemProps) {
  const { id, full_name, description, language, stargazers_count, pushed_at, html_url, owner } =
    repository;

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<RepositoryFormValues> = async (data) => {
    const updatedValues = {
      full_name: data.full_name,
      description: data.description,
      language: data.language,
    };
    dispatch(updateRepository({ id, updatedValues }));
    setIsEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteRepository(id));
    setIsDelete(false);
  };

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
        <li className={style.itemStar}>
          <img src={starIcon} alt="" className={style.itemIcon} />
          {stargazers_count}
        </li>
        <li>Updated on {new Date(pushed_at).toLocaleDateString()}</li>
      </ul>
      <div className={style.itemBtns}>
        <button type="button" className="button" onClick={() => setIsEdit(true)}>
          Edit
        </button>
        <button type="button" className="button" onClick={() => setIsDelete(true)}>
          Delete
        </button>
      </div>
      {isEdit && (
        <Modal>
          <RepositoryForm
            onSubmit={handleSubmit}
            onCancel={() => setIsEdit(false)}
            values={{
              full_name,
              description,
              language,
            }}
          />
        </Modal>
      )}
      {isDelete && (
        <Modal>
          <p className={style.modalText}>Delete this repository?</p>
          <div className={style.modalBtns}>
            <button type="button" className="button" onClick={handleDelete}>
              Delete
            </button>
            <button type="submit" className="button" onClick={() => setIsDelete(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RepositoryItem;
