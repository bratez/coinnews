import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';
import { Article } from './models/article';
import { Coin } from './models/coin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentCoinNews: Array<Article> = [];
  getNewsInterval = 3000;
  inRequest = false;
  recording: any;
  isRecording = false;
  toggleButtonLabel = 'Start Recording';

  constructor (private localstorageService: LocalstorageService) {
    this.currentCoinNews = this.localstorageService.getCurrentList();
    if (this.currentCoinNews.length) {
      this.startRecording();
    }
  }

  startRecording() {
    this.toggleButtonLabel = 'Stop recording';
    this.isRecording = true;
    this.recording = setInterval (() => {
        this.recordNews();
      }, this.getNewsInterval)
  }

  stopRecording() {
    this.toggleButtonLabel = 'Start recording';
    this.isRecording = false;
    clearInterval(this.recording);
  }

  toggleRecording() {
    this.isRecording ? this.stopRecording() : this.startRecording();
  }

  recordNews() {
    this.localstorageService.getNews().subscribe(news => {
      this.localstorageService.getCoins().subscribe(coins => {
        let coinNews: Array<Article> = [];
        coinNews = this.rearrangeNews(this.currentCoinNews.concat(news), coins);
        this.currentCoinNews = coinNews;
      });
    });
  }

  rearrangeNews(news, prices):Array<Article> {
    let noDublicates: Array<Article> = [];
    let urls: Array<string> = [];
    news.forEach(article => {
      if (!urls.includes(article.url)) {
        article.coinPrices = this.rearrangePrices(article.coinPrices, prices);
        urls.push(article.url);
        noDublicates.push(article);
      }
    });
    return noDublicates;
  }

  rearrangePrices(coins, newCoins):Array<Coin> {
    const maxPrices = 10;
    if (!coins.length) {
      coins = newCoins;
    } else {
      let prices = [];
      newCoins.forEach(coin => {
        if (typeof prices[coin.id] !== 'undefined') {
          prices[coin.id] = coin.usd;
        }
      });
      coins.forEach(coin => {
        if (maxPrices >= coin.prices.length) {
          coin.prices.push(prices[coin.id]);
        }
      });
    }
    return coins;
  }
}
