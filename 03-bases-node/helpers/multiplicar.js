const fs = require('fs')
const colors = require('colors')


const crearArchivo = async(base=5,listar,hasta) =>{
    try { 
        let salida = '';
        let consola = '';

        for (let i = 1; i <=hasta; i++) {
            consola += `${base}`.magenta + 'x'.red +`${i}`+ '='.red +`${base*i}`.green + '\n';
            salida += `${base} x ${i} = ${base*i} \n`;
        }
        if (listar) {
            console.log("=========================".rainbow);
            console.log(`       Tabla del:${base}       `.bgMagenta);
            console.log("=========================".rainbow);
            console.log(consola);    
        }
        
    
        fs.writeFileSync(`./salida/tabla-${base}.txt` , salida);
        return `tabla-${base}.txt`.america
    } catch (error) {
        throw error
    }
}

module.exports = {         // por medio de module se exportan los metodos
    crearArchivo           // crearArchivo: crearArchivo, es como si fuera un objeto y se hace la abrevacion para no ser redundante
}