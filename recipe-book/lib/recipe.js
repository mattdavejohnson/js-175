const nextId = require('./next-id');

class Recipe {
  constructor(name, meal, cookTime, ingredients) {
    this.id = nextId();
    this.name = name;
    this.meal = meal;
    this.cookTime = cookTime;
    this.ingredients = ingredients;
  }
}

module.exports = Recipe;
