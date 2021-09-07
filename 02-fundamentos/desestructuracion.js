const deadpool = {
    nombre: 'Wade',
    apellido : 'Winston',
    poder: 'Regeneracion',
    //edad: 50,
    getNombre(){
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }
}

console.log(deadpool.getNombre());

//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
//const poder = deadpool.poder;

const {nombre,apellido,poder,edad=0} = deadpool;  // Esta es la desestructuracion, dentro de {} se indican el nombre de las propiedades del objeto 
                                                  //a extraer. Ademas podemos asignares valores por defecto a estas propiedades

console.log(nombre,apellido,poder,edad);

function imprimirHeroe({nombre,apellido,poder,edad=0}){     //desestructuracion desde los argumentos de una funcion a un objeto, pero estos son let
    // const {nombre,apellido,poder,edad=0} = heroe                 Esto es en caso de que yo reciba el objeto como argumento
    console.log(nombre,apellido,poder,edad);
}

//imprimirHeroe(deadpool)

const heroe = ['Deapool','Superman','Batman'];

const [h1,h2,h3] = heroe;  // Desestructuracion de arreglos. De la siguiente forma indico cual me interesa [,,h3] en este caso h3 sera la 3 pos del arreglo

console.log(h1,h2,h3);