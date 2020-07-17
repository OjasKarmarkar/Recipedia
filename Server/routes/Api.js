const Recipe = require("../models/recipe-model");
const Keys = require('../config/keys')
// 1. CREATE RECIPE API //

createRecipe = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Recipe",
    });
  }

  const recipe = new Recipe(body);

  if (!recipe) {
    return res.status(400).json({ success: false, error: err });
  }

  recipe.save()
    .then(() => {
      return res.status(200).json({
        success: true,
        // id: recipe._id,
        message: "Recipe created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Recipe not created!",
      });
    });
};

getAllRecipes = (req , res) =>{
  console.log(req.headers)
  return res.status(200).json({
    message : "Done"
  })
}



// EXPORT //
module.exports ={
    createRecipe ,
    getAllRecipes
}