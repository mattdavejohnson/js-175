/* eslint-disable max-lines-per-function */
const express = require('express');
const morgan = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const Recipe = require('./lib/recipe');

const app = express();
const host = 'localhost';
const port = 3000;

let recipeList = require('./lib/seed-data');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: 'launch-school-practice-node-recipe',
    resave: false,
    saveUninitialized: true,
    secret: 'not very secure',
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

const loadRecipe = (recipeId) => {
  return recipeList.find((recipe) => recipe.id === recipeId);
};

app.get('/', (req, res) => {
  res.redirect('/recipes');
});

app.get('/recipes', (req, res) => {
  res.render('recipes', { recipeList });
});

app.get('/add-recipe', (req, res) => {
  res.render('add-recipe');
});

app.get('/recipes/:recipeId', (req, res) => {
  let { recipeId } = req.params;
  let recipe = loadRecipe(+recipeId);
  res.render('recipe', { recipe });
});

app.post(
  '/recipes/new',
  [
    body('recipeName')
      .trim()
      .isLength({ min: 1 })
      .withMessage('The recipe name is required')
      .isLength({ max: 100 })
      .withMessage('Recipe name must be between 1 and 100 characters'),
    body('ingredients')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Ingredients are required.'),
    body('cookTime')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Cooking time is required.'),
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((message) => req.flash('error', message.msg));
      res.render('add-recipe', {
        flash: req.flash(),
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        cookTime: req.body.cookTime,
      });
    } else {
      let recipeName = req.body.recipeName;
      let mealChoice = req.body.mealChoice;
      let ingredients = req.body.ingredients.split(',');
      let cookTime = req.body.cookTime;

      recipeList.push(
        new Recipe(recipeName, mealChoice, cookTime, ingredients)
      );

      req.flash('success', 'New recipe has been created.');
      res.redirect('/recipes');
    }
  }
);

app.listen(port, host, () => {
  console.log(`Recipe app is listening on port ${port} of ${host}`);
});
