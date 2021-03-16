import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navSelect = new EventEmitter<string>();
  @Input() activeTab: string;

  constructor() { }

  ngOnInit(): void {
  }

  onNavigate = (page: string): void => {
    this.navSelect.emit(page);
  }

  activeStyle = () => {
    return {
      color: 'dodgerblue'
    };
  }

}
