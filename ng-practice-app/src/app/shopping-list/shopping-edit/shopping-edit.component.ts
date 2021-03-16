import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addIngredient = new EventEmitter<Ingredient>();
  @Output() deleteIngredient = new EventEmitter<Ingredient>();
  @Input() selectedIngredient: Ingredient;
  @ViewChild('deleteButton') deleteButton: ElementRef;
  @ViewChild('addButton') addButton: ElementRef;

  ingName = '';
  ingQuantity = 0;

  constructor() { }

  ngOnInit(): void {
  }

  validClear = (): boolean => {
    return this.ingName !== '' || this.ingQuantity !== 0 ? true : false;
  }

  validAdd = (): boolean => {
    return this.ingName !== '' && this.ingQuantity !== 0 ? true : false ;
  }

  clearInputs = (): void => {
    this.ingName = '';
    this.ingQuantity = 0;
  }

  onAddIngredient = (): void => {
    this.addIngredient.emit(
      new Ingredient(this.ingName, this.ingQuantity)
    );
    this.clearInputs();
    this.addButton.nativeElement.disabled = true;
  }

  onDeleteIngredient = (ingredient: Ingredient): void => {
    this.deleteIngredient.emit(ingredient);
    this.deleteButton.nativeElement.disabled = true;
  }
}
