import { NgModule } from '@angular/core';

import { SharedResourceModule } from '../shared/shared-resource.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from '../routing/shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [SharedResourceModule, ShoppingListRoutingModule],
  exports: [],
})
export class ShoppingListModule {}
