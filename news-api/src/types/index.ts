type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
type Language = 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';
type Country =
  | 'ae'
  | 'ar'
  | 'at'
  | 'au'
  | 'be'
  | 'bg'
  | 'br'
  | 'ca'
  | 'ch'
  | 'cn'
  | 'co'
  | 'cu'
  | 'cz'
  | 'de'
  | 'eg'
  | 'fr'
  | 'gb'
  | 'gr'
  | 'hk'
  | 'hu'
  | 'id'
  | 'ie'
  | 'il'
  | 'in'
  | 'it'
  | 'jp'
  | 'kr'
  | 'lt'
  | 'lv'
  | 'ma'
  | 'mx'
  | 'my'
  | 'ng'
  | 'nl'
  | 'no'
  | 'nz'
  | 'ph'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'rs'
  | 'ru'
  | 'sa'
  | 'se'
  | 'sg'
  | 'si'
  | 'sk'
  | 'th'
  | 'tr'
  | 'tw'
  | 'ua'
  | 'us'
  | 've'
  | 'za';

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

export interface ResponseNewsInterface {
  status: string;
  totalResults?: number;
  articles?: NewsDataInterface[];
  sources?: SourcesDataInterface[];
}

export interface ResponseSourcesInterface {
  status: string;
  totalResults?: number;
  sources?: SourcesDataInterface[];
  articles?: NewsDataInterface[];
}

export interface getRespInterface {
  endpoint: string;
  options?: Record<string, string>;
}

export interface EventNews {
  target: EventTarget | null;
  currentTarget: EventTarget | null;
}
