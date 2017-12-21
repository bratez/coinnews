import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/catch'

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
          return response;
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
}
