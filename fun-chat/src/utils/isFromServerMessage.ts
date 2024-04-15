import type { User } from '../shared/Store/initialData.ts';

export interface Message {
  type: string;
  id: string | null;
  payload: {
    error: string | null;
    users: User[] | [];
  };
}

export const isFromServerMessage = (message: unknown): null | Message => {
  const isValidMessage = (msg: unknown): msg is Message =>
    typeof msg === 'object' &&
    msg !== null &&
    'type' in msg &&
    'id' in msg &&
    'payload' in msg;

  if (isValidMessage(message)) {
    return message;
  }
  return null;
};
