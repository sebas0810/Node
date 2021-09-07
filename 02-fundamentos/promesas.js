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

const getEmpleado = (id) =>{
    const promesa = new Promise((resolve,reject)=>{                // se puede simplificar en vez de retornr en 38, poner return new Promise(...)
        const empleado = empleados.find((e)=> e.id === id)?.nombre;

        (empleado) // alternativa al if
            ?resolve(empleado)
            :reject(`No existe el empleado con id ${id}`);

        // if (empleado) {
        //     resolve(empleado);
        // }else{
        //     reject(`No existe el empleado con id ${id}`)
        // }

    });

    return promesa
}

//TAREA!
const getSalario = (id) =>{
    const promesa = new Promise((resolve,reject)=>{
        const empleadoSalario = salarios.find((e) => e.id === id)?.salario; // ? es un null check , pregunta si la respuesta es distinta de undifiend, es decir si encontro alguno
        
        (empleadoSalario)
            ? resolve(empleadoSalario) // Si encuentra
            : reject(`El salario para el id ${id} no existe`) // si no
    })

    return promesa
}

const id = 3;

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch(err => console.log(err));

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch(err => console.log(err))

getEmpleado(id)
    .then(empleado =>{
        getSalario(id)
            .then(salario =>console.log('El empleado:',empleado,'tiene un salario de',salario))
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));