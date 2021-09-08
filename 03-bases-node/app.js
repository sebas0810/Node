//npm init se crear el package.json o rapidamente con npm init -Y
//npm install "nombrepaquete"            se crea como dependecia del programa
//npm install "nombrepaquete" --save-dev     se crea como dependencia de desarrollo
//npm run base3 corre el scrip desde terminal que se indica en el package.json

const { crearArchivo } = require('./helpers/multiplicar') //dado que yo en multiplicar estoy mandando un objeto a los que quieran exportarme, lo desestructuro
console.clear();

// No es muy eficiente. Lo mejor es usar Yargs
const[,,arg3='base=5'] = process.argv; //desestructuracion de arreglo porque argv es un arreglo
const[,base=5] = arg3.split('=');

//console.log(base);

// const base =3;

crearArchivo(base)
        .then(archivo => console.log(archivo,'creado!') )
        .catch(err => console.log(err));





