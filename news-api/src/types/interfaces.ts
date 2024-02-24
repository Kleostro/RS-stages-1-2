import type { Category, Country, Language } from './enums';

export interface SourcesDataInterface {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  language: Language;
  country: Country;
}

export interface NewsDataInterface {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ResponseSourcesInterface {
  status: string;
  totalResults?: number;
  sources?: SourcesDataInterface[];
  articles?: NewsDataInterface[];
}

export interface GetRespInterface {
  endpoint: string;
  options?: Record<string, string>;
}
export interface EventNews {
  target: EventTarget | null;
  currentTarget: EventTarget | null;
}
