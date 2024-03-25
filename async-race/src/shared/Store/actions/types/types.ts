import type ACTIONS from './enums.ts';

type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

export default ActionType;
