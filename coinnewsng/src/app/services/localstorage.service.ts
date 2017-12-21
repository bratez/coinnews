import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import {Article} from '../models/article';
import {Coin} from '../models/coin';
import {Source} from '../models/source';

@Injectable()
export class LocalstorageService {
  currentTime = new Date();
  logsStorageName = `coinnewsng_${this.currentTime.getDate()}-${this.currentTime.getMonth()}-${this.currentTime.getFullYear()}`;
  apiKey = 'cf2c9a25b09a49d9ad67f99f6057bcd6';

  constructor(private http: Http) {}

  getCurrentList () {
    return localStorage.getItem(this.logsStorageName) !== null ? JSON.parse(localStorage.getItem(this.logsStorageName)) : [];
  }

  setCurrentList (data) {
    localStorage.setItem(this.logsStorageName, data);
  }

  getNews ():Observable<any> {
    return this.http.get(`https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=${this.apiKey}`)
      .map(response => {
        if (response && response.status === 200) {
          return this.fetchNews(response.json().articles);
        } else {
          console.log('response', response);
        }
      })
      .share()
      .catch(error => {
        console.error('failed to get news');
        return Observable.throw(error);
      });
  }

  getCoins ():Observable<any> {
    return this.http.get(`https://api.coinmarketcap.com/v1/ticker/`)
      .map(response => {
        if (response && response.status === 200) {
          return this.fetchCoins(response.json());
        } else {
          console.log('response', response);
        }
      })
      .share()
      .catch(error => {
        console.error('failed to get news');
        return Observable.throw(error);
      });
  }

  fetchNews (data):Array<Article> {
    return data.map(article => {
      return new Article({
        author: article.author,
        description: article.description,
        publishedAt: article.publishedAt,
        source: new Source({id: article.source.id, name: article.source.name}),
        title: article.title,
        url:  article.url,
        urlToImage:  article.urlToImage,
        coinPrices: article.coinPrices && article.coinPrices.length ? this.fetchCoins(article.coinPrices) : [],
        stopChecking: false
      });
    });
  }

  fetchCoins (data):Array<Coin> {
    return data.map(coin => {
      return new Coin({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.rank,
        usd: coin.price_usd,
        btc: coin.price_btc,
        dayVolumeUsd: coin['24h_volume_usd'],
        marketCapUsd: coin.market_cap_usd,
        availableSupply: coin.available_supply,
        totalSupply: coin.total_supply,
        maxSupply: coin.max_supply,
        oneHour: coin.percent_change_1h,
        oneDay: coin.percent_change_24h,
        oneWeek: coin.percent_change_7d,
        lastUpdated: coin.last_updated,
        prices: []
      });
    });
  }
}
