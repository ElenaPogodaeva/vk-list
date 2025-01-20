import { useForm } from 'react-hook-form';
import style from './RepositoryForm.module.scss';
import { RepositoryFormValues } from '../../types';

type RepositoryFormProps = {
  onSubmit: (data: RepositoryFormValues) => void;
  onCancel: () => void;
  values: {
    full_name: string;
    description: string;
    language: string;
  };
};

function RepositoryForm({ onSubmit, onCancel, values }: RepositoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RepositoryFormValues>({
    defaultValues: {
      full_name: values.full_name,
      description: values.description,
      language: values.language,
    },
  });

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={style.formLabel}>
        <p>
          Repository name
          {errors?.full_name && <span className={style.formError}>* Enter repository name</span>}
        </p>
        <input
          type="text"
          className={`input ${style.formInput}`}
          {...register('full_name', { required: true })}
          placeholder="Enter repository name"
        />
      </label>
      <label className={style.formLabel}>
        <p>Description</p>
        <textarea
          className={`input ${style.formInput}`}
          {...register('description')}
          placeholder="Enter description of this repository"
        />
      </label>
      <label className={style.formLabel}>
        <p>Language</p>
        <input
          type="text"
          className={`input ${style.formInput}`}
          {...register('language')}
          placeholder="Enter language"
        />
      </label>
      <div className={style.formBtns}>
        <button type="submit" className="button">
          Save
        </button>
        <button type="button" className="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default RepositoryForm;
