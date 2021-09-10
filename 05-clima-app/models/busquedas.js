const fs = require('fs');

const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historial.map(l =>{
            let palabras = l.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ')
        })
    }
    
    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }
    
    get paramsOpenWeather(){
        return { 
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad (lugar= ''){
        console.log('Ciudad:',lugar);

        try {

            const axi = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await axi.get();
    
            return resp.data.features.map( lugar =>({ // Se crea un nuevo arreglo con objetos con atributos renombrados
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })) //retornar los lugares que coincidan
        } catch (error) {
            return [];
        }
        
    }

    async climaLugar(lat, lon){
        try {
            //instance axios
            const axi = axios.create({
                baseURL: `http://api.openweathermap.org/data/2.5/weather`,
                params: {... this.paramsOpenWeather, lat,lon}
            })

            // resp.data
            let resp = await axi.get();
            resp = resp.data;

            return {
                desc:resp.weather[0].description,
                min: resp.main.temp_min,
                max: resp.main.temp_max,
                temp: resp.main.temp
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        if (this.historial.includes(lugar.toLowerCase())) {
            return;
        }
        
        this.historial = this.historial.splice(0,5);
        //TODO: prevenir duplicado
        this.historial.unshift(lugar.toLowerCase());

        //Grabar en DB
        this.guardarDB();
    }

    guardarDB(){
        const payload ={
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        // Debe existir archivo
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        const data = JSON.parse(info)

        this.historial = data.historial;

    }
}


module.exports = Busquedas;