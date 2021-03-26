import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  public formatRecipeDescription = (): string => {
    if (this.recipe.description.length <= 39) {
      return this.recipe.description;
    } else {
      const formattedDescription = this.recipe.description.slice(0,35);
      return `${formattedDescription}...`
    }
  }

}
