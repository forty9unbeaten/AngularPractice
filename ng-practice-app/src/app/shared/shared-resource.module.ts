import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DropdownToggleDirective } from './directives/dropdown-toggle.directive';
import { Error404Component } from './components/error404/error404.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UnitPipe } from './pipes/unit-pipe.pipe';

@NgModule({
  declarations: [
    UnitPipe,
    ShortenPipe,
    Error404Component,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownToggleDirective,
  ],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [
    UnitPipe,
    ShortenPipe,
    Error404Component,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownToggleDirective,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class SharedResourceModule {}
