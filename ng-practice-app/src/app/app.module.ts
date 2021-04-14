import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '@routing/app-routing.module';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { SharedResourceModule } from '@shared/shared-resource.module';
import { reducerMap } from '@app/app.state';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducerMap),
    SharedResourceModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
