const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies');




const app = express()
app.use(express.json()) // middleware
app.disable('x-powered-by')


const ACEPTED_ORGINS = [ //URL que decido aceptar
    'http://127.0.0.1:5500',
    'http://localhost:1234',
    'http://localhost:5500',
    'http://movies.com',
]


// listar todas las películas por género
app.get('/movies', (req, res) => {
    const origin = req.get('origin') // recuperacion del header origin de la peticion
    
    if (ACEPTED_ORGINS.includes(origin) || !origin) {  // si no hay cabecera es porque se hace la petición desde el mismo servidor
        res.header('Access-Control-Allow-Origin', origin) // '*' le estamos dejando que cualquiera tenga acceso ( se podría poner para una url especifica ) 
    }

    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

// insertar una película
app.post('/movies', async (req ,res)=> {
   const result = await validateMovie(req.body)

   if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
   }

  
  const newMovie = {
    id: crypto.randomUUID(), // cración de clave aleatoria (nativa de node)
    ...result.data
  } 

  // esto se cambiará para meter los datos en la DB
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

// listar las películas por id
app.get('/movies/:id', (req, res) => { //path to regex
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if(movie) return res.json(movie)

    res.status(500).json({ message: 'Movie not found'})
})

// listar todas las películas
app.get('/movies', (req, res) => {
res.json(movies)
})

// eliminar peliculas
app.delete('/movies/:id', (req, res) => {
    const origin = req.get('origin') // recuperacion del header origin de la peticion
    
    if (ACEPTED_ORGINS.includes(origin) || !origin) {  // si no hay cabecera es porque se hace la petición desde el mismo servidor
        res.header('Access-Control-Allow-Origin', origin) // '*' le estamos dejando que cualquiera tenga acceso ( se podría poner para una url especifica ) 
    }


    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie file found'})
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted'})

})

//modificar una película
app.patch('/movies/:id', async (req, res) => {
    const result = validatePartialMovie(req.body)
   
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
   
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id = id)

    if (movieIndex == -1) {
        res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies [movieIndex] = updateMovie

    return res.json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
    const origin = req.get('origin') // recuperacion del header origin de la peticion
    if (ACEPTED_ORGINS.includes(origin) || !origin) {  // si no hay cabecera es porque se hace la petición desde el mismo servidor
        res.header('Access-Control-Allow-Origin', origin) // '*' le estamos dejando que cualquiera tenga acceso ( se podría poner para una url especifica ) 
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    }
    res.send(200)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})