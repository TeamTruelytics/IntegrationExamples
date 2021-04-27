import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TruelyticsPeerBenchmarksComponent } from './truelytics-peer-benchmarks/truelytics-peer-benchmarks.component';
import { TruelyticsWidgetsComponent } from './truelytics-widgets/truelytics-widgets.component';
import { TruelyticsEmbeddedComponent } from './truelytics-embedded/truelytics-embedded.component';
import { TruelyticsConnectComponent } from './truelytics-connect/truelytics-connect.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TruelyticsPeerBenchmarksComponent,
    TruelyticsWidgetsComponent,
    TruelyticsEmbeddedComponent,
    TruelyticsConnectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'truelytics/peer-benchmarks', component: TruelyticsPeerBenchmarksComponent },
      { path: 'truelytics/widgets', component: TruelyticsWidgetsComponent },
      { path: 'truelytics/embedded', component: TruelyticsEmbeddedComponent },
      { path: 'truelytics/connect', component: TruelyticsConnectComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
