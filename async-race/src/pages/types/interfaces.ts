import type { CarInterface } from '../../shared/Api/types/interfaces.ts';

interface PageInterface {
  getHTML(): HTMLDivElement;
}

export interface WinnerInfo {
  id: number;
  time: number;
  wins: number;
  car: CarInterface;
}

export default PageInterface;
