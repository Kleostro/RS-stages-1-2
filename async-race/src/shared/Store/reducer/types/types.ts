import type * as ACTIONS from '../../actions/actions.ts';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Action = ReturnType<InferValueTypes<typeof ACTIONS>>;
