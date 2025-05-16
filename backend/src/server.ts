import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import publicationRoutes from './routes/publicationRoutes'
import morgan from 'morgan'

//**/-> previamente se instalaron dependencias (nodemon, ts-node, typescript) / express -> con -D @types/express */
//**/-> se creo un 'tsconfig.json' y se copio un gist del profesor para configurarlo */
//# se creo carpeta src/ -> dentro se creo archivo 'index.ts' y 'server.ts'

//#se importa dotenv y se inicializa antes de que se cree el servidor para que se puedan tomar las variables de entorno (url db)
dotenv.config()

//# se importa 'connectDB' y se inicia antes de que conecte la app
connectDB()

//# creacion del servidor (se importo express)
const app = express()
//#permitir las conexiones utilizando la configuracion hecha
app.use(cors(corsConfig))

//#morgan log
app.use(morgan('dev'))

//#en el servidor se habilita la lectura de formatos en consola (ej: JSON)
app.use(express.json())

//#Routes
app.use('/api/publications', publicationRoutes) //-> soporta todos los metodos HTTP


export default app