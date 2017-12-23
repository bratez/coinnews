import {combineReducers} from 'redux';
import {CoinNewsState, coinNewsInitialState, coinNewsReducer} from './reducer';


export interface RootState {
  coinnews: CoinNewsState;
}

export const rootInitialState: RootState = {
  coinnews: coinNewsInitialState
};

export const rootReducer = combineReducers<RootState>({
  coinnews: coinNewsReducer
});
