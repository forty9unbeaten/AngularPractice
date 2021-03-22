import { Component } from '@angular/core';
import { RecipesService } from './services/recipes.service';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'ng-practice-app';
  public activeTab = 'r';

  constructor(private recipesService: RecipesService) {
    this.recipesService.switchToShoppingList.subscribe(() => {
      this.activeTab = 's';
    });
  }

  switchTabs = (tab: string): void => {
    this.activeTab = tab;
  }
}
