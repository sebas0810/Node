require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() =>{

    const busquedas =  new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                // Mostrar Mensaje
                let termino = await leerInput('Ciudad: ');
                
                // Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;
                const lugarSel = lugares.find(l => l.id == id);

                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);
                
                // Clima
                const lat = lugarSel.lat;
                const lon = lugarSel.lng
                const clima = await busquedas.climaLugar(lat,lon);

                // Mostrar resultados
                console.clear();
                console.log('\n Informacion de la ciudad \n'.yellow);
                console.log('Ciudad:',lugarSel.nombre);
                console.log('Lat:',lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:',clima.temp,'C°'.yellow);
                console.log('Minima:',clima.min,'C°'.yellow);
                console.log('Maxima:',clima.max,'C°'.yellow);
                console.log('El clima es como:',clima.desc);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) =>{
                    const idx= `${i+1}.`.green; 
                    console.log(`${idx} ${lugar}`);
                })
                break;
            case 0:
                break;    
            default:
                break;
        }
        if(opt !== 0) await pausa();
    } while (opt != 0);
}

main();