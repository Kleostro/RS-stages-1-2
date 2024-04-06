import type * as ACTIONS from '../../actions/actions.ts';

export type Reducer<S, A> = (state: S, action: A) => S;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Action = ReturnType<InferValueTypes<typeof ACTIONS>>;
