import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'ng-practice-app';
  public activeTab = 'r';

  constructor(private shoppingList: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList.navToShoppingList.subscribe(() => {
      this.activeTab = 's';
    });
  }

  switchTabs = (tab: string): void => {
    this.activeTab = tab;
  }
}
