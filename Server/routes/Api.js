const Recipe = require("../models/recipe-model");
const Keys = require("../config/keys");
const User = require("../models/user-model");

login = (req, res) => {
  const body = req.body;
  console.log(!body)
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an Id",
    });
  } else {
    User.findOne({ googleID: body.id })
      .then((currentUser) => {
        if (currentUser) {
          return res.status(200).json({
            success: true,
            message: "Logged In",
          });
          // check if user exists already
        } else {
          new User({
            username: body.displayName,
            googleID: body.id,
            profilePic: body.profileImg,
          })
            .save()
            .then((newUser) => {
              return res.status(200).json({
                success: true,
                message: "Signed Up!",
              });
              //console.log("new User" + newUser);
            }).catch((error) => {
              return res.status(400).json({
                error,
                message: "User not created!",
              });
            });
        }
      })
      .catch();
  }
};

// 1. CREATE RECIPE API //
createRecipe = (req, res) => {
  console.log(req.file);
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

  recipe["creation_date"] = Date.now();
  recipe['recipePic'] = "/uploads/" + req.file.originalname

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
  // console.log(req.headers);
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

// 3. search //
search = async (req, res) => {
  console.log(req.query.q);
  if (!req.query.q) {
    return res
      .status(200)
      .json({ success: false, error: "Please send search query" });
  }
  await Recipe.find(
    { title: { $regex: new RegExp(`^${req.query.q}`), $options: "i" } },
    (err, recipes) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log(recipes);
      if (!recipes.length) {
        return res
          .status(404)
          .json({ success: false, error: `Recipe not found` });
      }
      return res.status(200).json({ success: true, data: recipes });
    }
  ).catch((err) => console.log(err));
};

rate = async (req, res) => {
  var finalRating;
  if (!req.body.id) {
    return res
      .status(400)
      .json({ success: false, error: `Need recipe ID to rate` });
  } else if (!req.body.rating) {
    return res.status(400).json({ success: false, error: `Rating is needed` });
  }
  await Recipe.findById(req.body.id, (err, recipe) => {
    // ((Overall Rating * Total Rating) + new Rating) / (Total Rating + 1)
    //console.log(`((${typeof recipe.rating} * ${typeof recipe.ratingCount}) + ${typeof req.query.rating}) / ((${typeof recipe.ratingCount} + 1))`);
    //console.log(((recipe.rating * recipe.ratingCount) + req.query.rating) / ((recipe.ratingCount + 1)));
    recipe.rating =
      (recipe.rating * recipe.ratingCount + parseInt(req.body.rating)) /
      (recipe.ratingCount + 1);
    recipe.ratingCount += 1;
    finalRating = recipe.rating;
    recipe.save();
    return res
      .status(200)
      .json({
        success: true,
        message: `Recipe rating updated`,
        rating: finalRating,
      });
  });
};

like = async (req, res) => {
  if (!req.body.id) {
    return res
      .status(400)
      .json({ success: false, error: `Need recipe ID to like` });
  }

  await Recipe.findById(req.body.id, (err, recipe) => {
    recipe.likes += 1;
    recipe.save();
    return res
      .status(200)
      .json({
        success: true,
        message: `Recipe likes updated`,
        likes: recipe.likes,
      });
  });
};

// EXPORT //
module.exports = {
  createRecipe,
  getAllRecipes,
  search,
  rate,
  like,
  login,
};
