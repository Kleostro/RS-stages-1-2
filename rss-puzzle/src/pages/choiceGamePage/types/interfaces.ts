export interface levelDataInfo {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface wordsInfo {
  id: number;
  word: string;
  wordTranslate: string;
  textExample: string;
  textExampleTranslate: string;
  audioExample: string;
}

export interface roundsInfo {
  levelData: levelDataInfo;
  words: [wordsInfo];
}

export interface levelInfo {
  rounds: [roundsInfo];
  roundsCount: number;
}

export interface CompletedRound {
  lvl: number;
  round: number;
}
