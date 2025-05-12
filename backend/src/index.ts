//# se importa el servidor
import server from './server'
import colors from 'colors' //-> se instalo dependencia de colores para mostrar en consola

//#definicion del puerto
const port = process.env.PORT || 4000 //-> del lado izq la variable de entorno cuando se hace deploy, si no existe selecciona puerto 4000

//# escuchar el puerto
server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`))
})
//**hasta aca finaliza creacion del servidor** */
//# posterior al listen del port, se dirije al package.json y se coloca la siguiente linea para poder ejecutar el script en consola '"dev": "nodemon --exec ts-node src/index.ts"'