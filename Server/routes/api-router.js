const router = require('express').Router()
const RecipeApis = require('./Api')
const Recipe = require("../models/recipe-model");
var multer  = require('multer')

const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , './public/uploads')
    },
    filename: function(req , file , cb){
        cb(null , file.originalname);  
    }
})

var upload = multer({storage:storage})

router.post('/create', upload.single('image') ,RecipeApis.createRecipe)
router.get('/getAll', RecipeApis.getAllRecipes)
router.post('/getLiked', RecipeApis.getLiked)
router.get('/search', RecipeApis.search)
router.post('/rate', RecipeApis.rate)
router.post('/like', RecipeApis.like)
router.post('/login', RecipeApis.login)

module.exports = router;