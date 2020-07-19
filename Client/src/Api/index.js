import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createRecipe = payload => api.post('/create', payload)
export const getAllRecipes = () => api.get(`/getAll`)

const apis = {
   createRecipe,
   getAllRecipes
}

export default apis