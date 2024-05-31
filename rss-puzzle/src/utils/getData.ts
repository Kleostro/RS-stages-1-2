import type { levelInfo } from '../pages/choiceGamePage/types/interfaces';

const getData = async (url: string): Promise<levelInfo | null> => {
  const data: levelInfo | null = await fetch(url)
    .then((response) => response.json())
    .then((json: levelInfo) => json)
    .catch(() => null);
  return data;
};

export default getData;
