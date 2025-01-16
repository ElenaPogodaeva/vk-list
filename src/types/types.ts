export type Repository = {
  id: string;
  full_name: string;
  description: string;
  updated_at: string;
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
  page: string;
  per_page: string;
};
