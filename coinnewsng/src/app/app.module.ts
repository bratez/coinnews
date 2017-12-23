import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Service } from './services/service.service';
import { Actions } from './redux/actions';
import { HttpModule } from '@angular/http';
import { ReduxStoreModule } from './redux/store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReduxStoreModule
  ],
  providers: [
    Service,
    Actions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
