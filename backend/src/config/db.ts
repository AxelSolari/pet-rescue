import mongoose from "mongoose";
import colors from 'colors'
import { exit } from 'node:process';

//# se creo carpeta config y dentor archivo db.ts / se va a generar la conexion de express con la db

//# conectar a la db entre express y mongoose
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)//-> en el archivo server se import 'dotenv' y se inicializo para que se puedan utilizar las variables de entorno
        // console.log(connection)
        const url =`${connection.connection.host}:${connection.connection.port}`
        console.log(colors.magenta.bold(`MongoDB conectado en: ${url}`))
    } catch (error) {
        // console.log(error.message)
        console.log(colors.red.bold('Error al conectar a MongoDB'))
        exit(1) //->en caso que la db no se pueda conectar mostrara el error y se detiene la ejecucion 
    }
} 