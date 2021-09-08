const fs = require('fs')

const crearArchivo = async(base=5) =>{
    try {
        console.log("=========================");
        console.log('       Tabla del:',base   );
        console.log("=========================");
        
        let salida = '';

        for (let i = 1; i < 11; i++) {
            salida += `${base} x ${i} = ${base*i} \n`;
        }
        
        console.log(salida);
    
        fs.writeFileSync(`tabla-${base}.txt` , salida);
        return `tabla-${base}.txt`
    } catch (error) {
        throw error
    }
}

module.exports = {         // por medio de module se exportan los metodos
    crearArchivo           // crearArchivo: crearArchivo, es como si fuera un objeto y se hace la abrevacion para no ser redundante
}