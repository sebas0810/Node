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
    });

    return promesa
}

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

const getInfoUsuario = async(id) =>{            // async lo que hace en una funcion sea asincrona es decir,hace que esta retorne una promesa
    try {
        const empleado = await getEmpleado(id);     // await se usa para funciones asincronas, es decir que retornen una promesa
        const salario = await getSalario(id);
    
        return `El empleado ${empleado} tiene un salario de ${salario}` 
    } catch (error) {
        throw error; // con el return error en caso de que uno de los 2 existe va entrar al then. con throw si hay algun error siempre pasa por catch
    }
}

getInfoUsuario(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));