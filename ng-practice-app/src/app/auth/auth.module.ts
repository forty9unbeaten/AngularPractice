import { NgModule } from '@angular/core';

import { AuthRoutingModule } from '@routing/auth-routing.module';
import { SharedResourceModule } from '@shared/shared-resource.module';
import { AuthComponent } from '@auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedResourceModule, AuthRoutingModule],
  exports: [],
})
export class AuthenticationModule {}
