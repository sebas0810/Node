var nombre = 'Goku'; // Variable que es global para todo el programa
console.log(nombre);

let nombreM = 'Iron Man'; // Let se define en cada ambito si lo requiere, si no simplemente con el nombre se cambia su valor

if (true) {
    // let nombreM = "Hulk"; esta seria una nueva variable nombre dentro del if
    nombreM = 'Hulk'; //Variable hace referencia a la variable nombreM declarada como let 
    var nombre = 'Picoro'; // Se reemplaza el valor de var nombre de la parte de arriba
}

console.log(nombreM);
console.log(nombre);

const apellido = 'Lopez' //Variable inmutable