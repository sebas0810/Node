const empleados = [
    {
        id: 1,
        nombre: 'Iron Man'
    },
    {
        id: 2,
        nombre: 'Hulk'
    },
    {
        id: 3,
        nombre: 'Thor'
    }
]

const salarios = [
    {
        id: 1,
        salario: 2000
    },
    {
        id: 2,
        salario: 1500
    }
]

const getEmpleado = (id,callback) =>{
    const empleado = empleados.find((e)=> e.id === id);

    if(empleado){
        callback(null, empleado.nombre); // en caso de que todo este bien acostumbrase a enviar un null. Null == false
    }else{
        callback(`El empleado con id ${id} no existe`);
    }
    
}

// TAREA!!
const getSalario = (id,callback) =>{
    const empleadoSalario = salarios.find((e) => e.id === id)?.salario; // ? es un null check , pregunta si la respuesta es distinta de undifiend, es decir si encontro alguno
    if (empleadoSalario) {
        callback(null,empleadoSalario)
    }else{
        callback(`El salario para el id ${id} no existe`);
    }
}

const id = 3;

getEmpleado(id, (error,empleado)=>{

    if(error){
        console.log('ERROR!!');
        return console.log(error);
    }

    console.log('Empleado existe');

    getSalario(id,(err,Salario) =>{
        if (err) {
            console.log('ERROR!');
            return console.log(err);
        }
    
        console.log('El empleado:', empleado, 'tiene un salario de:', Salario);
    })
});

