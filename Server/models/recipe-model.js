const mongoose = require("mongoose");
const Schema = mongoose.Schema;

recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0 },
  creation_date: { type: Date, required: true },
  is_veg: { type: Boolean, required: true },
  rating: { type: Number, default: 5 },
  ingredients: { type: Array, required: true },
  video_link: {
    type: String,
  },
  steps: { type: Array, required: true },
});

const Recipe = mongoose.model("Recipes", recipeSchema);

module.exports = Recipe;
