import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'


const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})



// app.options('/movies/:id', (req, res) => {
//     const origin = req.get('origin') // recuperacion del header origin de la peticion
//     if (ACEPTED_ORGINS.includes(origin) || !origin) {  // si no hay cabecera es porque se hace la petición desde el mismo servidor
//         res.header('Access-Control-Allow-Origin', origin) // '*' le estamos dejando que cualquiera tenga acceso ( se podría poner para una url especifica )
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//     }
//     res.send(200)
// })

