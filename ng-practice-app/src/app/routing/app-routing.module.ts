import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../shared/components/error404/error404.component';

const appRoutes: Routes = [
  {
    path: 'recipes',
    loadChildren: () =>
      import('../recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('../shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../auth/auth.module').then((m) => m.AuthenticationModule),
  },
  { path: 'not-found', component: Error404Component },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
