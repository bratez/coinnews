import {updatedModelWithValues} from '../utils/common.utils';
import {Source} from './source';
import {Coin} from './coin';

export class Article {

  author: string;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url:  string;
  urlToImage:  string;

  constructor(data?: any) {
    updatedModelWithValues(this, data);
  }
}
