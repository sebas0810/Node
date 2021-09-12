const http = require('http');

// req: request es todo lo que me estan pidiendo por parte del cliente
// res: response es lo que mi servidor responde ante una peticion
http.createServer((req,res) =>{ 

    //res.writeHead(200, {'Content-Type': 'application/json'}) //El tipo de respuesta que dare
    //res.writeHead(200, {'Content-Type': 'application/csv'})

    const persona = {
        id:1,
        nombre: 'Sebastian Lopez'
    }

    
    //res.write(JSON.stringify(persona));
    res.write('Hola Mundo')
    res.end();
})
.listen(8080);

console.log('Escucnado el puerto', 8080);