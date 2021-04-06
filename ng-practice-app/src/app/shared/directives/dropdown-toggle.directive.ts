import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownToggle]'
})
export class DropdownToggleDirective {

  constructor(private element: ElementRef) { }

  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) dropdownClick = (evt: Event): void => {
    if (this.element.nativeElement.contains(evt.target)) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }

}
