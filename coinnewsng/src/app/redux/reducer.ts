import {Article} from '../models/article';
import {Coin} from '../models/coin';
import {Actions} from './actions';

export interface CoinNewsState {
  news: Array<Article>;
  coins: Array<Array<Coin>>;
}

export const coinNewsInitialState: CoinNewsState = {
  news: [],
  coins: []
};

export const coinNewsReducer = (state: CoinNewsState = coinNewsInitialState, action): CoinNewsState => {
  switch (action.type) {
    case Actions.LOADED_NEWS:
      return {
        ...state,
        news: action.payload
      }
  }

  return state;
}
