import type { Status } from '../shared/Store/initialData.ts';

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: Status;
}

const isMessage = (value: unknown): value is Message =>
  typeof value === 'object' &&
  value !== null &&
  'from' in value &&
  'to' in value &&
  'text' in value &&
  'datetime' in value &&
  'status' in value;

export default isMessage;
