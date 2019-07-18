import { ActionReducer, createReducer, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface State {}
export const initialState: State = {};

export function logger(
  actionReducer: ActionReducer<State>
): ActionReducer<State> {
  return (state: State, action: any): any => {
    const result = actionReducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
export const reducer = createReducer(initialState);
