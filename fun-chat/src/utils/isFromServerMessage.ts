import type { User } from '../shared/Store/initialData.ts';
import type { Message } from './isMessage.ts';

export interface MessageFromServer {
  type: string;
  id: string | null;
  payload: {
    error: string | null;
    users: User[] | [];
    messages: Message[] | [];
    message: {
      id: string;
      status: {
        isDelivered: boolean;
      };
    };
  };
}

export const isFromServerMessage = (
  message: unknown,
): null | MessageFromServer => {
  const isValidMessage = (msg: unknown): msg is MessageFromServer =>
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
