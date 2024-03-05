import type PageInterface from '../../pages/types/interfaces.ts';

interface RouterInterface {
  addPage(page: PageInterface): void;
  renderNewPage(pageID: string): void;
}

export default RouterInterface;
