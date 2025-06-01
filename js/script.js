import { idAleatorio, idAleatorioCheckbox } from "./idAleatorio.js";

const d = document
const $btnCierreModal = d.querySelector(".cierre__modal")
const $crearTarea = d.querySelector(".btn-nuevaTarea")
const $modal = d.querySelector(".ventana__modal")
const $form = d.querySelector(".form")
const ls = localStorage

// Templates
const prototipo = d.getElementById("template")
const fragmento = d.createDocumentFragment()
const $contenedorDeTareas = d.querySelector(".lista__tareas")


d.addEventListener("DOMContentLoaded", ()=>{
    $contenedorDeTareas.textContent = ""

    // Boton de crear tarea
    $crearTarea.addEventListener("click", (e)=>{
        $modal.classList.add("modalActive")
    })

    // Boton para cerrar la ventana modal
    $btnCierreModal.addEventListener("click", (e)=>{
        if($btnCierreModal.classList.contains("cierre__modal")){
            $modal.classList.remove("modalActive")
            $form.dataset.id = ""
            $form.reset()
        }
    })

    // Envio de informacion para la creacion de tareas
    $form.addEventListener("submit", (e)=>{
        e.preventDefault()
        
        let tareasGuardadas = JSON.parse(ls.getItem("nuevaTarea")) || []
        let tareaId = $form.dataset.id;

        // Traeremos los valores del formulario
        if(!tareaId){
            let nuevaTarea = {
                id: idAleatorio(),
                tituloTarea : $form.descTarea.value,
                estadoTarea : $form.estado.value,
                prioridadTarea : $form.prioridad.value,
                fechaTarea : $form.fecha.value
            }

            tareasGuardadas.push(nuevaTarea)
            ls.setItem("nuevaTarea", JSON.stringify(tareasGuardadas))
        }else{
            // Buscar la tarea y actualizar sus valores
            const indice = tareasGuardadas.findIndex(tarea => tarea.id === tareaId);
        
            if (indice !== -1) {
                // tareasGuardadas[indice].id = tareasGuardadas.id,
                tareasGuardadas[indice].tituloTarea = $form.descTarea.value
                tareasGuardadas[indice].estadoTarea = $form.estado.value,
                tareasGuardadas[indice].prioridadTarea = $form.prioridad.value,
                tareasGuardadas[indice].fechaTarea = $form.fecha.value
            }
                
            // Guardar el array actualizado en localStorage
            ls.setItem("nuevaTarea", JSON.stringify(tareasGuardadas));
        }
        mostrarTareaEnLista()
        $modal.classList.remove("modalActive")
        $form.reset()
    })

    // Visualizacion de tareas en el DOM
    function mostrarTareaEnLista(filtro="todas"){

        let tareasCreadas = JSON.parse(ls.getItem("nuevaTarea"))
        $contenedorDeTareas.innerHTML = ""; 
        if(tareasCreadas.length === 0){
            $contenedorDeTareas.innerHTML = "<div class='tarea sinTarea'>No tienes tareas por realizar</div>"
        }
        let tareasFiltradas = tareasCreadas.filter(tarea => {
            if (filtro === "todas"){
                 return true;
            }else if(filtro === "completadas"){
                return tarea.estadoTarea === "completada";
            }else if(filtro === "pendientes"){
                return tarea.estadoTarea === "pendiente" || tarea.estadoTarea === "en-progreso";

            }
        });
        // Asignacion de tareas en el contenedor
        tareasFiltradas.forEach(tarea => {
            let clone = prototipo.content.cloneNode(true)
            let id = idAleatorioCheckbox()
            if(tarea.estadoTarea === "completada"){
                clone.querySelector(".tareaCompletada").setAttribute("checked", "")
                clone.querySelector(".tarea").classList.add("completada")
            }else{
                clone.querySelector(".tareaCompletada").removeAttribute("checked")
                clone.querySelector(".tarea").classList.remove("completada")
            }
            clone.querySelector(".tarea").setAttribute("id", tarea.id)
            clone.querySelector(".tarea__titulo").textContent = tarea.tituloTarea
            clone.querySelector(".tarea__fecha").textContent = tarea.fechaTarea
            clone.querySelector(".tareaCompletada").setAttribute("id", id)
            clone.querySelector("label").setAttribute("for", id)
            clone.querySelector(".eliminar").dataset.id = tarea.id

            clone.querySelector(".editar").dataset.id = tarea.id
            clone.querySelector(".editar").dataset.titulo = tarea.tituloTarea
            clone.querySelector(".editar").dataset.estado = tarea.estadoTarea
            clone.querySelector(".editar").dataset.prioridad = tarea.prioridadTarea
            clone.querySelector(".editar").dataset.fecha = tarea.fechaTarea

            clone.querySelector(".tareaCompletada").dataset.id = tarea.id
            clone.querySelector(".tareaCompletada").dataset.estado = tarea.estadoTarea
            fragmento.appendChild(clone)
        });
        $contenedorDeTareas.appendChild(fragmento)
    }

    // Eliminar tarea
    function eliminarTarea(id) {
        let tareasGuardadas = JSON.parse(ls.getItem("nuevaTarea")) || [];

        // Filtrar las tareas, dejando solo las que NO coincidan con el título dado
        tareasGuardadas = tareasGuardadas.filter(tarea => tarea.id !== id);
        // Actualizar localStorage
        localStorage.setItem("nuevaTarea", JSON.stringify(tareasGuardadas));

        // Volver a renderizar la lista
        mostrarTareaEnLista();
    }
    d.addEventListener("click", (e)=>{
        let elemento = e.target.closest(".eliminar")
        if(elemento){
            let id = e.target.closest(".eliminar").dataset.id
            eliminarTarea(id)
        }
    })

    // Editar tarea
    d.addEventListener("click", (e)=>{
        let elemento = e.target.closest(".editar")
        if(elemento){
            let datosTarea = e.target.closest(".editar").dataset
            $modal.classList.add("modalActive")
            $modal.querySelector(".modal__titulo").textContent = "Editar tarea"
            $modal.querySelector(".btn-envio").textContent = "Actualizar tarea"
            $form.dataset.id = datosTarea.id
            $form.descTarea.value = datosTarea.titulo
            $form.estado.value= datosTarea.estado
            $form.prioridad.value= datosTarea.prioridad
            $form.fecha.value= datosTarea.fecha
        }
    })
    
    // Actualizacion de estado de tarea
    d.addEventListener("change", (e)=>{
        let elemento = e.target.classList.contains("tareaCompletada")
        if(elemento){
            let id = e.target.dataset.id
            let estado = e.target.dataset
            let tareasGuardadas = JSON.parse(ls.getItem("nuevaTarea")) || [];
            const indice = tareasGuardadas.findIndex(tarea => tarea.id === id);
            if (indice !== -1) {
                tareasGuardadas[indice].estadoTarea = e.target.checked ? "completada" : "pendiente";
                ls.setItem("nuevaTarea", JSON.stringify(tareasGuardadas));
            }
            mostrarTareaEnLista();
        }

    })

    // Visualizacion de filtros
    d.addEventListener("click", (e) => {
        const btnFiltro = e.target.closest("button[data-filtro]");
        if (btnFiltro) {
            const filtro = btnFiltro.dataset.filtro;
            mostrarTareaEnLista(filtro);
        }
    });

    mostrarTareaEnLista()
})