import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public dataLoading = false;
  public dataError = null;

  constructor() { }

  ngOnInit(): void {
  }

  activeStyle = () => {
    return {
      color: 'dodgerblue'
    };
  }
}
