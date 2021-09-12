require('dotenv').config();
const express = require('express')
const hbs = require('hbs');


const app = express();
const port = process.env.PORT;

//Handlebars
app.set('view engine','hbs') // hbs es parte de handelebars para renderizar html en express
hbs.registerPartials(__dirname + '/views/parciales', (err) =>{})

// Servir contenido estatico
app.use(express.static('public')); // Dado que la carpeta public tiene prioridad sobre las rutas marcadas abajo
                                   // entonces la raiz no se ejecutara, si por ejemplo creo una carpeta llamada
                                   // hola-mundo con un archivo html entonces al llamar esa ruta se ejecuta lo
                                   // la carpeta public y no lo de la ruta de este archivo
 
app.get('/',(req, res) => {  // Se especifica la ruta
  res.render('home',{
      nombre: 'Sebastian Lopez Restrepo',
      titulo: 'Curso de Node'
  });  //renderiza el archivo home.hbs de la carpeta views
})

app.get('/generic',(req, res) => {
    res.render('generic',{
        nombre: 'Sebastian Lopez Restrepo',
        titulo: 'Curso de Node'
    });
})

app.get('/elements',(req, res) => {
    res.render('elements',{
        nombre: 'Sebastian Lopez Restrepo',
        titulo: 'Curso de Node'
    });
})


app.get('*', (req, res) => {    // Comodin para cualquier otra ruta
    res.sendFile(__dirname+'/public/404.html')  //Contenido estatico
})
 
app.listen(port, ()=>{
    console.log(`Aplicacion de ejemplo esta corriendo en http://localhost:${port} `);
})