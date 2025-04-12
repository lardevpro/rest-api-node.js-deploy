import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'


export const moviesRouter = Router()

// get all
moviesRouter.get('/', MovieController.getAll)
// filter by id
moviesRouter.get('/:id', MovieController.getById)
// create
moviesRouter.post('/', MovieController.createMovie)
// delete
moviesRouter.delete('/:id', MovieController.deleteMovie)
// update movie
moviesRouter.patch('/:id',MovieController.updateMovie)