require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenu,pausa,leerInput,listadoTareasBorrar,confirmar,mostrarListadoCheackList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
//const {mostrarMenu,pausa} = require('./helpers/mensajes')  cuando lo estuvimos haciendo manualmente

console.clear();

const main = async() =>{
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { // cargar tareas
        tareas.cargarTareas(tareasDB);
    }

    do {
       //opt = await mostrarMenu();
       opt = await inquirerMenu();
       switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
               break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listadoPendienteCompletadas();
                break;
            case '4':
                tareas.listadoPendienteCompletadas(false);
                break;
            case '5':
                const ids =await mostrarListadoCheackList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !=='0') {
                    if(await confirmar('Esta seguro?')){
                        tareas.borrarTarea(id)
                        console.log('Tarea Borrada');
                    }
                }
                break;
           default:
               break;
       }
       guardarDB(tareas.listadoArr);
       //if (opt !== '0') await pausa(); // este era del antiguo menu de la clase mensajes
       if (opt !== '0') await pausa()
       
    } while (opt !== '0');
    
    // pausa();
}

main()