const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opciones',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tareas`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

const pausaMenu = [
    {
        type: 'input',
        name: 'menuPausa',
        message: `\nPresione ${'ENTER'.green} para continuar\n`
    }
]

const inquirerMenu = async() =>{
    console.clear();
    console.log('================================'.green);
    console.log('     Seleccione una opcion      '.white);
    console.log('================================\n'.green);

    const {opciones} = await inquirer.prompt(preguntas);
    return opciones;
}

const pausa = async() =>{
    console.log('\n');
    await inquirer.prompt(pausaMenu)
    return '';

}

const leerInput = async(message)=>{
    const question=[{
        type: 'input',
        name: 'desc',
        message,  //message : message
        validate(value){
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) =>{
        const choices = tareas.map((tarea,i) => {
            
            const idx= `${i+1}.`.green; //index nada mas
            return { //Para cada tarea va retornar esto. Es decir al final se creara un arreglo con nada uno de estos return
                value: tarea.id,
                name: `${idx} ${tarea.descripcion}`
            }
        })

        choices.unshift({
            value: '0',
            name: '0.'.green + 'Cancelar'
        });   

        const preguntas = [
            {
                type: 'list',
                name: 'id',
                message: 'Borrar',
                choices
            }
        ]
        const {id} = await inquirer.prompt(preguntas);
        return id;
}

const confirmar = async(message) =>{
    const question=[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheackList = async(tareas = []) =>{
    const choices = tareas.map((tarea,i) => {
        
        const idx= `${i+1}.`.green; //index nada mas
        return { //Para cada tarea va retornar esto. Es decir al final se creara un arreglo con nada uno de estos return
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheackList
}