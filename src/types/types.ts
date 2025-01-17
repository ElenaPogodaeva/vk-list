export type Repository = {
  id: string;
  full_name: string;
  description: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  owner: {
    avatar_url: string;
    html_url: string;
  };
};

export type QueryParams = {
  q: string;
  sort: string;
  order: string;
  page: string;
  per_page: string;
};

export enum SortType {
  StarsDesc = 'stars-desc',
  StarsAsc = 'stars-asc',
  UpdatedDesc = 'updated-desc',
  UpdatedAsc = 'updated-asc',
}
