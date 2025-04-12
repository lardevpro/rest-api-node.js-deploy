import cors from 'cors'

const ACEPTED_ORGINS = [
    'http://127.0.0.1:5500',
    'http://localhost:1234',
    'http://localhost:5500',
    'http://movies.com',
  ]

export const corsMiddleware = ({ acceptedOrigins = ACEPTED_ORGINS } = {}) => cors({
    origin: (origin, callback) => {
     
      
      if (ACEPTED_ORGINS.includes(origin)) {
          return callback(null, true)
        }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
})