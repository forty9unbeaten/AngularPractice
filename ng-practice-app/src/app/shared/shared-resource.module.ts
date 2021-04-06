import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
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
  exports: [
    UnitPipe,
    ShortenPipe,
    Error404Component,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownToggleDirective,
  ],
})
export class SharedResourceModule {}
