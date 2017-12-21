import {updatedModelWithValues} from '../utils/common.utils';

export class Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price_usd: number;
  price_btc: number;
  day_volume_usd: number;
  market_cap_usd: string;
  available_supply: number;
  total_supply: number;
  max_supply: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  last_updated: number;

  constructor(data?: any) {
    updatedModelWithValues(this, data);
  }
}
