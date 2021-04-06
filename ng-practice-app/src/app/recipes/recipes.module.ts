import { NgModule } from '@angular/core';
import { SharedResourceModule } from '../shared/shared-resource.module';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from '../routing/recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeHomeComponent,
  ],
  imports: [SharedResourceModule, RecipesRoutingModule],
  exports: [],
})
export class RecipesModule {}
