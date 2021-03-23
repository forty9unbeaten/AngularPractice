import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { Error404Component } from '../error404/error404.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeHomeComponent } from '../recipes/recipe-home/recipe-home.component';

const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },
    { path: '', component: RecipeHomeComponent, pathMatch: 'full' }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
