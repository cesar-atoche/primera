import { array } from './base.js';
import { generadorCodigo } from './clase.js';
import { tablita, tbody } from './selectores.js';


let ind = 0;

//FUNCIONES



//funcion agrega objeto al array
export function alCargar(array) {
    for (const iterator of array) {
        const alcargar = new generadorCodigo(ind, iterator.nombre, iterator.apellido, iterator.genero, iterator.nacimiento, iterator.curso, iterator.notas[0], iterator.notas[1], iterator.notas[2]);
        agregaArray(alcargar)
        ind++;
    }
}

//funcion guarda en localstorage
function sincronizarStorage() {
    localStorage.setItem('Alumno', JSON.stringify(array));
}

//agrega al array
function agregaArray(objetoCodigo) {
    array.push(objetoCodigo);
}


//imprime  el array
export function mostrar(array) {
    try {
        tablita.innerHTML = "";
        for (let [key, iterator] of Object.entries(array)) {
            const btnEditar = boton("Editar");
            const btnEliminar = boton("Eliminar");
            //evento click boton editar
            btnEditar.addEventListener("click", () => {
                agregaEdicion(key);
            });
            //evento click boton eliminar
            btnEliminar.addEventListener("click", () => {
                eliminar(key);
            });
            const row = document.createElement('tr');
            row.setAttribute("class", "text-black align-middle");
            row.innerHTML = `
        <td>00${iterator.id}</td>
        <td >${iterator.generaCodigo()}</td>
        <td>${capitalizarPrimeraLetra(iterator.nombre)}</td>
        <td>${capitalizarPrimeraLetra(iterator.apellido)}</td>
        <td>${iterator.validaGenero()}</td>
        <td>${iterator.nacimiento}</td>
        <td>${capitalizarPrimeraLetra(iterator.curso)}</td>
        <td id="tdEditar"></td>
        <td></td>`
            tablita.appendChild(row);
            //agregamos botones
            row.children[7].appendChild(btnEditar)
            row.children[8].appendChild(btnEliminar)
            sincronizarStorage()
        }
    } catch (e) {

    }
}

//funcion crea boton
function boton(valor) {
    const boton = document.createElement("input");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", valor);
    if (valor == "Editar") {
        boton.setAttribute("class", "btn btn-warning");
        boton.setAttribute("data-bs-target", "#modal-editar");
        boton.setAttribute("data-bs-toggle", "modal");
    }
    else if (valor == "EditarN") {
        boton.setAttribute("class", "btn btn-warning");
        boton.setAttribute("value", "Editar");
    }
    else {
        boton.setAttribute("class", "btn btn-danger");
    }
    return boton;
}

//funcion primera letra mayuscula
function capitalizarPrimeraLetra(str) {
    let arrayPalabra = str.split(" ");
    let obtiene = "";
    for (const key in arrayPalabra) {
        let elemento = arrayPalabra[key];
        obtiene += elemento.charAt(0).toUpperCase() + elemento.slice(1) + " ";
    }
    return obtiene;
}

//agrega value en el modal editar
function agregaEdicion(indice) {
    limpiarFormulario("formulario1");
    document.getElementById("edicion-nombre").setAttribute("value", array[indice].nombre);
    document.getElementById("edicion-apellido").setAttribute("value", array[indice].apellido);
    document.getElementById("edicion-genero").setAttribute("value", array[indice].genero);
    document.getElementById("edicion-nacimiento").setAttribute("value", array[indice].nacimiento);
    document.getElementById("edicion-curso").setAttribute("value", array[indice].curso);
    document.getElementById("indice").setAttribute("value", indice);

}

//funcion editar el array
export function editarAlumno() {
    let gen = document.getElementById("edicion-genero").value;
    if (gen.toUpperCase() !== "M" && gen.toUpperCase() !== "F") {
        alert('[ERROR] El campo genero debe contener M o F...');
        return false;
    }
    let indice = document.getElementById("indice").value;
    array[indice].nombre = document.getElementById("edicion-nombre").value;
    array[indice].apellido = document.getElementById("edicion-apellido").value;
    array[indice].genero = gen;
    array[indice].nacimiento = document.getElementById("edicion-nacimiento").value;
    array[indice].curso = document.getElementById("edicion-curso").value;
    mostrar(array);
}

//agrega elementos al array
export function agregarAlumno() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let genero = document.getElementById("genero").value;
    let nacimiento = document.getElementById("nacimiento").value;
    let curso = document.getElementById("curso").value;
    if (nombre == null || nombre.length == 0) {
        alert('[ERROR] El campo nombre debe tener un valor...');
        return false;
    }
    else if (apellido == null || apellido.length == 0) {
        alert('[ERROR] El campo apellido debe tener un valor...');
        return false;
    }
    else if (genero == "Genero" || genero == "genero") {
        alert('[ERROR] El campo genero debe contener M o F...');
        return false;
    }
    else if (nacimiento == null || nacimiento.length == 0) {
        alert('[ERROR] El campo nacimiento debe tener un valor...');
        return false;
    }
    else if (curso == null || curso.length == 0) {
        alert('[ERROR] El campo curso debe tener un valor...');
        return false;
    }
    const agregado = new generadorCodigo(ind++, nombre, apellido, genero, nacimiento, curso);
    agregaArray(agregado)
    tablita.innerHTML = "";
    mostrar(array)
    limpiarFormulario("formulario")
}

//elimina elementos
function eliminar(indice) {
    array.splice(indice, 1);
    mostrar(array)
}

//funcion limpiar formulario
function limpiarFormulario(nombre) {
    document.getElementById(nombre).reset();
    return true;
}

//funcion busca por nombre y apellido
export function buscarAlumno(bus) {
    const resultNombre = array.filter(arr => arr.nombre.includes(bus.toLowerCase()));
    const resultApellido = array.filter(arr => arr.apellido.includes(bus.toLowerCase()));
    const dataArr = [...new Set([...resultNombre, ...resultApellido])];
    mostrar(dataArr)
}

export function filtrarAlumnos() {
    let arraynuevo = array.map((x) => x);
    let filtrar = document.getElementById("filtrar").value;
    if (filtrar == 1) { //filtra por nombre
        arraynuevo.sort((x, y) => {
            if (x.nombre < y.nombre) { return -1 }
            if (x.nombre > y.nombre) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 2) { //filtra por apellido
        arraynuevo.sort((x, y) => {
            if (x.apellido < y.apellido) { return -1 }
            if (x.apellido > y.apellido) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 3) {
        arraynuevo.sort((x, y) => {//filtra por curso
            if (x.curso < y.curso) { return -1 }
            if (x.curso > y.curso) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
    else if (filtrar == 4) {
        arraynuevo.sort((x, y) => {//filtra por genero
            if (x.genero < y.genero) { return -1 }
            if (x.genero > y.genero) { return 1 }
            return 0
        });
        mostrar(arraynuevo);
    }
}


//notass

export function mostrarNotas(array) {
    try {
        tbody.innerHTML = "";
        for (let [key, iterator] of Object.entries(array)) {
            const btnEditarNota = boton("EditarN");
            const btnGuardarNota = boton("Guardar");
            //evento click boton editar
            btnEditarNota.addEventListener("click", () => {
                editarNota(key);
            });
            //evento click boton eliminar
            btnGuardarNota.addEventListener("click", () => {
                guardarNota(key);
            });
            const row = document.createElement('tr');
            row.setAttribute("class", "text-black align-middle");
            row.innerHTML = `
            <td>00${iterator.id}</td>
            <td>${capitalizarPrimeraLetra(iterator.nombre)}</td>
            <td>${capitalizarPrimeraLetra(iterator.apellido)}</td>
            <td>${capitalizarPrimeraLetra(iterator.curso)}</td>
            <td><input type="text" size="1" id ="nota1${key}" value="${iterator.notas[0] || 0}" disabled></td>
            <td><input type="text" size="1" id ="nota2${key}" value="${iterator.notas[1] || 0}" disabled></td>
            <td><input type="text" size="1" id ="nota3${key}" value="${iterator.notas[2] || 0}" disabled></td>
            <td><input type="text" size="1" id ="promedio" value="${iterator.promedio() || 0}" disabled></td>
            <td id="tdEditar"></td>
            <td></td>`
            tbody.appendChild(row);
            //agregamos botones
            row.children[8].appendChild(btnEditarNota)
            row.children[9].appendChild(btnGuardarNota)
            sincronizarStorage()
        }
    } catch (e) {

    }
}



//guarda en el array
function guardarNota(indice) {
    array[indice].notas[0] = document.getElementById(`nota1${indice}`).value;
    array[indice].notas[1] = document.getElementById(`nota2${indice}`).value;
    array[indice].notas[2] = document.getElementById(`nota3${indice}`).value;
    mostrarNotas(array);
}

//edita los input y los habilita 
function editarNota(indice) {
    document.getElementById(`nota1${indice}`).removeAttribute("disabled")
    document.getElementById(`nota2${indice}`).removeAttribute("disabled")
    document.getElementById(`nota3${indice}`).removeAttribute("disabled")
}
