import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../services/recipes.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {


  constructor(private recipesService: RecipesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
