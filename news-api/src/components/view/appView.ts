import News from './news/news';
import Sources from './sources/sources';
import type { ResponseNewsInterface, ResponseSourcesInterface } from '@/types';

interface AppViewInterface {
  drawNews(data: ResponseNewsInterface): void;
  drawSources(data: ResponseSourcesInterface): void;
}

export class AppView implements AppViewInterface {
  private news: News;
  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: ResponseNewsInterface): void {
    const values = data.articles ? data.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: ResponseSourcesInterface): void {
    const values = data.sources ? data.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
