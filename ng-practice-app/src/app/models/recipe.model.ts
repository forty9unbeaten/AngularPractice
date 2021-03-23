import { Ingredient } from './ingredient.model';

export class Recipe {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public imgPath: string,
        public ingredients: Ingredient[]
    ) {}
}
