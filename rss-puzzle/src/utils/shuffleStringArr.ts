const shuffleStringArr = (arr: string[]): string[] =>
  arr.sort(() => Math.random() - 0.5);

export default shuffleStringArr;
