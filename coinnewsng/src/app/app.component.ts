import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Actions } from './redux/actions';
import { Article } from './models/article';
import { Coin } from './models/coin';
import { Service } from './services/service.service';
import {NgRedux} from '@angular-redux/store';
import {RootState} from './redux/root-reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  dataSubscription: Subscription;
  currentCoinNews: Array<Article> = [];
  coins: Array<Array<Coin>> = [];
  getNewsInterval = 3000;
  inRequest = false;
  recording: any;
  isRecording = false;
  toggleButtonLabel = 'Start Recording';

  constructor (private ngRedux: NgRedux<RootState>, private actions: Actions, private service: Service) {
    this.actions.getCurrentList();

    this.dataSubscription = this.ngRedux.select(state => state.coinnews).subscribe((data) => {
      this.currentCoinNews = data.news;
      this.coins = data.coins;
    });
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
    /*this.service.getNews().subscribe(news => {
      this.currentCoinNews = this.rearrangeNews(this.currentCoinNews.concat(news));
    });

    this.service.getCoins().subscribe(coins => {
       this.coins.push(coins);
    });*/
    this.actions.getCurrentList();
  }

  rearrangeNews(news):Array<Article> {
    let noDublicates: Array<Article> = [];
    let urls: Array<string> = [];
    news.forEach(article => {
      if (!urls.includes(article.url)) {
        urls.push(article.url);
        noDublicates.push(article);
      }
    });
    return noDublicates;
  }
}
