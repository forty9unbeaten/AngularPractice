import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-practice-app';
  activeTab = 'r';

  switchTabs = (tab: string): void => {
    this.activeTab = tab;
  }
}
