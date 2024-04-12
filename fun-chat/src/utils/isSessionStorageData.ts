import type SessionStorageInterface from '../shared/SessionStorage/types/interfaces.ts';

const isSessionStorageData = (
  data: unknown,
): data is SessionStorageInterface => {
  if (typeof data === 'object' && data !== null) {
    return true;
  }
  return false;
};

export default isSessionStorageData;
