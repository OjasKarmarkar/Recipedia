const mongoose = require('mongoose')
const Schema = mongoose.Schema;

recipeSchema = new Schema({
    title: String ,
    userID : String ,
    likes: Number ,
    creation_date: Date ,
    is_veg : Boolean ,
    rating: Number ,
    ingredients: Array,
    video_link : String ,
    steps: Array
})

const Recipe = mongoose.model('Recipes' , recipeSchema)

module.exports = Recipe;