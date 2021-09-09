
/**
 * _listado:
 *     { 'uuid-125464-64886-3213213: {id:uuid-54455-888-1123, descripcion:sdsd, completadoEn:'78545} '}
 */

const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key]
            listado.push(tarea);
        })


        return listado;
    }

    constructor(){
        this._listado = {};
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id=''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareas(tareas){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto(){
        let i = 1;
        this.listadoArr.forEach(tarea =>{  //(tareas,i)
            (tarea.completadoEn)
                ? console.log(`${i.toString().green}. ${tarea.descripcion} :: ${'Completada'.green}`)
                :console.log(`${i.toString().red}. ${tarea.descripcion} :: ${'Pendiente'.red}`);
            i++;
        })
    }

    listadoPendienteCompletadas(completado=true){
        let i=1;
        this.listadoArr.forEach(tarea =>{
            const {descripcion, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? completadoEn.green
                            : 'Pendiente'.red
            
            if (completado) {
                if (completadoEn) {
                    console.log(`${i.toString().green}. ${descripcion} :: ${estado}`);
                    i++;
                }
            }else{
                if (!completadoEn) {
                    console.log(`${i.toString().red}. ${descripcion} :: ${estado}`);
                    i++;
                }
            }
        })
    }

    toggleCompletadas(ids =[]){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;