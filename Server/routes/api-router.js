const router = require('express').Router()
const RecipeApis = require('./Api')
const Recipe = require("../models/recipe-model");

router.post('/create', RecipeApis.createRecipe)
router.get('/getAll', RecipeApis.getAllRecipes)
router.get('/test', async (req, res) => {
    console.log(req.headers);
    console.log(req.body.id);
    if(!req.body.id){
        return res.status(200).json({success: 'lskdjf'});
    }
    await Recipe.find({title: req.body.id}, (err, recipes) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!recipes.length) {
        return res
          .status(404)
          .json({ success: false, error: `Recipe not found` });
      }
      return res.status(200).json({ success: true, data: recipes });
    }).catch((err) => console.log(err));
  })

module.exports = router;