import type {
  PictureInfo,
  lineInfo,
} from '@/widgets/playground/types/interfaces';
import type MapOfLineInfo from '../widgets/playground/types/types';

export const isPictureInfo = (obj: unknown): obj is PictureInfo =>
  typeof obj === 'object' &&
  obj !== null &&
  'src' in obj &&
  'title' in obj &&
  'info' in obj;

export const isMapOfLineInfoArr = (
  arr: unknown,
): arr is [Map<number, lineInfo>, Map<number, lineInfo>, PictureInfo] =>
  Array.isArray(arr) &&
  arr.length === 3 &&
  arr[0] instanceof Map &&
  arr[1] instanceof Map &&
  isPictureInfo(arr[2]);

export const isMapOfLineInfo = (obj: unknown): obj is MapOfLineInfo =>
  obj instanceof Map;
