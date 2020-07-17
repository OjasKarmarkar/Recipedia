const Recipe = require("../models/recipe-model");
const Keys = require("../config/keys");
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

  recipe
    .save()
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

getAllRecipes = async (req, res) => {
  console.log(req.headers);
  await Recipe.find({}, (err, recipes) => {
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
};

// EXPORT //
module.exports = {
  createRecipe,
  getAllRecipes,
};
