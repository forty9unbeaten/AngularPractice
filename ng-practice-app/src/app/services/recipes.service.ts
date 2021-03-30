import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[];
  private recipesURL: string = 'https://angular-practice-8c0db-default-rtdb.firebaseio.com/recipes';
  public recipesChanged = new Subject<Recipe[]>();
  public recipeChanged = new Subject<Recipe>();

  constructor(private http: HttpClient) {
  }

  public getRecipeList = (): Observable<any> => {
    return this.http.get(`${this.recipesURL}.json`).pipe(
      map(
        (res) => {
          if (res) {
            let recipesArray: Recipe[] = [];
            for(let firebaseId in res) {
              res[firebaseId].id = firebaseId;
              if (!res[firebaseId].ingredients) {
                res[firebaseId].ingredients = [];
              }
              recipesArray.push(res[firebaseId]);
            }
            this.recipes = recipesArray;
            return recipesArray;
          } else {
            this.recipes = [];  
          }
          this.recipesChanged.next(this.recipes.slice())
          return this.recipes.slice();
        }
      )
    )
  }

  public getSelectedRecipe = (id: string): Observable<any> => {
    return this.http.get(`${this.recipesURL}/${id}.json`).pipe(
      map(
        (res: Recipe) => {
          res.id = id;
          if (!res.ingredients) {
            res.ingredients = [];
          }
          return res;
        }
      )
    )
  }

  public addRecipe = (recipe: Recipe): void => {
    this.http.post(`${this.recipesURL}.json`, recipe)
    .subscribe(
      (res: {name: string}) => {
        recipe.id = res.name
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      },
      error => {
        console.log(error)
      }
    );
  }

  public deleteRecipe = (recipe: Recipe): void => {
    this.http.delete(`${this.recipesURL}/${recipe.id}.json`)
      .subscribe(
        res => {
          this.recipes = this.recipes.filter(existingRecipe => existingRecipe.id !== recipe.id);
          this.recipesChanged.next(this.recipes.slice())
        },
        error => {
          console.log(error);
        }
      );
  }

  public changeRecipe = (recipe: Recipe): void => {
    this.http.patch(`${this.recipesURL}/${recipe.id}.json`, recipe)
    .subscribe(
        (recipe: Recipe) => {
          this.recipes = this.recipes.map(existingRecipe => {
            return existingRecipe.id === recipe.id ? recipe : existingRecipe
          });
          this.recipeChanged.next(recipe);
          this.recipesChanged.next(this.recipes.slice())
        },
        error => {
          console.log(error);
        }
      )
  }
}
