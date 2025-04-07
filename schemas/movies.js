const z = require('zod')

 //validacion con 'zod'
    const movieSchema = z.object({ //objeto que se va a recibir
        title: z.string({  
            invalid_type_error: 'Movie title must be string',//mensajes de error opcionales
            required_error:'Movie title is required'
        }),
        year: z.number().int().positive().min(1900).max(2024),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10).default(5.5),
        poster: z.string().url({
            message: 'Poster must be a valid URL'
        }),
        genre: z.array(
            z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
            {
                required_error: 'Movie genere is required',
                invalid_type_error: 'Movie genre must be an array of enum Genre'
            }
        )
    })

    function validateMovie(object){
        return movieSchema.safeParseAsync(object) //safeParse devuelve si la operación tuvo éxito
    }

    function validatePartialMovie (object) {
        return movieSchema.partial().safeParse(object) // partial si no está no le da importancia, si está me la valida
    }


    module.exports = { validateMovie, validatePartialMovie }