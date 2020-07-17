const router = require('express').Router()
const RecipeApis = require('./Api')

router.post('/create', RecipeApis.createRecipe)
router.get('/getAll', RecipeApis.getAllRecipes)


module.exports = router;