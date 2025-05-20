import { CorsOptions } from "cors";

//# configuracion de cors
export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]

        if(process.argv[2] === '--api') {
            whitelist.push(undefined)
        }

        //# se agrega !origin, -> undefined, SOLO PARA DESARROLLO, EN PRODUCCION HAY QUE QUITARLO
        if(!origin || whitelist.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}