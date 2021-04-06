import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const slRoutes = [{ path: '', component: ShoppingListComponent }];

@NgModule({
  imports: [RouterModule.forChild(slRoutes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
