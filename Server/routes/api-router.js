const router = require('express').Router()
const RecipeApis = require('./Api')

router.post('/create', RecipeApis.createRecipe)


module.exports = router;