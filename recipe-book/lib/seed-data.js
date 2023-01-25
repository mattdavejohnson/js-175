const Recipe = require('./recipe');

let recipe1 = new Recipe('Cereal', 'Breakfast', 2, ['milk', 'cereal']);
let recipe2 = new Recipe('Turkey Sandwich', 'Lunch', 10, [
  'bread',
  'turkey',
  'mayo',
]);
let recipe3 = new Recipe('Spagetti', 'Dinner', 30, [
  'pasta',
  'sauce',
  'meatballs',
]);

let recipes = [recipe1, recipe2, recipe3];

module.exports = recipes;
