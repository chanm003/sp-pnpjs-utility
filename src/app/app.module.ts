import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpPnpjsUtilityModule } from './modules/sp-pnpjs-utility/sp-pnpjs-utility.module';
import { UserDataService } from 'app/testapp/shared/user-data.service';
import { CountriesKeywordSearchService } from 'app/testapp/shared/countries-keyword-search.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SpPnpjsUtilityModule.forRoot(),
    HttpClientModule,
    ClarityModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    UserDataService,
    CountriesKeywordSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
