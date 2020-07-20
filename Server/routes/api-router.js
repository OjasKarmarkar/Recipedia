const router = require('express').Router()
const RecipeApis = require('./Api')
const Recipe = require("../models/recipe-model");

router.post('/create', RecipeApis.createRecipe)
router.get('/getAll', RecipeApis.getAllRecipes)
router.get('/search', RecipeApis.search)
router.get('/rate', RecipeApis.rate)
router.get('/like', RecipeApis.like)

module.exports = router;