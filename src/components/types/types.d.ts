export interface ApiData {
  _id: string;
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  imageUrl: string;
  source: string;
  sourceId: string;
}

export interface Values {
  title: string;
  from: string;
  to: string;
  sortBy: string;
  sourceId: string;
}

export interface ImportValues {
  q: String,
  from: Date | String,
  to: Date | String
}

export interface Categories {
  categories: String[]
}