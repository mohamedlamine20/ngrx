import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './app-routing-module';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component'
import { appReducer } from './store/app.state';
import { AuthEffect } from './auth/state/auth.effect';
import { AuthTokenInterceptor } from './services/auth-token.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffect]),
    StoreDevtoolsModule.instrument({
      name: "counter"
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthTokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
