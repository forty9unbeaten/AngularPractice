import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from '../routing/auth-routing.module';
import { SharedResourceModule } from '../shared/shared-resource.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, SharedResourceModule, AuthRoutingModule],
  exports: [],
})
export class AuthenticationModule {}
