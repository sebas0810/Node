// Funcion que se ejecutara mas adelante en cierto punto del tiempo

// setTimeout(()=>{
//     console.log('Hola Mundo');
// },1000)

const getUsuarioByID = (id, callback) =>{ //recibe como parametro una funcion
    const usuario = {
        id,
        nombre: 'Sebastian'
    }

    setTimeout(()=>{
        callback(usuario); // se hace llamado de la funcion que se mando al metodo
    },1500);
}

getUsuarioByID(10, (usuario)=>{
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
});