import {updatedModelWithValues} from '../utils/common.utils';

export class Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  usd: number;
  btc: number;
  dayVolumeUsd: number;
  marketCapUsd: string;
  availableSupply: number;
  totalSupply: number;
  maxSupply: number;
  oneHour: number;
  oneDay: number;
  oneWeek: number;
  lastUpdated: number;
  prices: Array<number>;

  constructor(data?: any) {
    updatedModelWithValues(this, data);
  }
}
