import type MapOfLineInfo from '../widgets/playground/types/types';

const isMapOfLineInfoArr = (arr: unknown): arr is MapOfLineInfo[] =>
  Array.isArray(arr) && arr.every((item) => item instanceof Map);

export default isMapOfLineInfoArr;
