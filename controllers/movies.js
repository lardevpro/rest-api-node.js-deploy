import { MovieModel } from '../models/postgres/movie.js'
import { validatePartialMovie } from '../schemas/movies.js'

export class MovieController  {

  // get all
  static async getAll(req, res)  {
      const { genre } = req.query
      const movies = await MovieModel.getAll({ genre })
      res.json(movies)
  }

  // get by id
  static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if(movie) return res.json(movie)
        res.status(404).json({ message: 'Movie not found'})  
  }

  // create
  static async createMovie (req ,res) {
     const result = validatePartialMovie(req.body)
      
     if (!result.success){
         return res.status(400).json({ error: JSON.parse(result.error.message) })
     }
     
      const newMovie = await MovieModel.create({ input: result.data })
  
      res.status(201).json(newMovie) 
  }

  // delete
  static async deleteMovie (req, res)  {
      const { id } = req.params
  
      const result = await MovieModel.delete({ id })
  
      if (result === false) {
          return res.status(404).json({ message: 'Movie file found'})
      }
  
      return res.json({ message: 'Movie deleted'})
  }

  // update 
  static async updateMovie  (req, res)  {
    const result = validatePartialMovie(req.body)
   
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
   
    const { id } = req.params
    
    const updateMovie = await MovieModel.update({ id, input: result.data }) 

    return res.json(updateMovie)
  }
}