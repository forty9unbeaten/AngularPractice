import { Ingredient } from '@models/ingredient.model';

export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imgPath: string,
    public ingredients: Ingredient[],
    public id = ''
  ) {}
}
