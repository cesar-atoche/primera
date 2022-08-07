function alCargar() {
    // cargamos los datos
    for (const iterator of array1) {
        const alcargar = new generadorCodigo(ind, iterator.nombre.toLowerCase(), iterator.apellido.toLowerCase(), iterator.genero, iterator.nacimiento, iterator.curso.toLowerCase());
        agregaArray(alcargar)
        ind++;
    }
    mostrar(array);
}

//agrega al array
function agregaArray(objetoCodigo) {
    array.push(objetoCodigo);
}

//imprime  el array
function mostrar(array) {
    document.getElementById("tabla-datos").innerHTML = "";
    let indice = 0;
    for (const iterator of array) {
        html = `<tr class="text-black align-middle">
        <td>00${iterator.id}</td>
        <td >${iterator.generaCodigo()}</td>
        <td>${capitalizarPrimeraLetra(iterator.nombre)}</td>
        <td>${capitalizarPrimeraLetra(iterator.apellido)}</td>
        <td>${iterator.validaGenero()}</td>
        <td>${iterator.nacimiento}</td>
        <td>${capitalizarPrimeraLetra(iterator.curso)}</td>
        <td><input type="button" value="Editar" class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#modal-editar" onclick="agregaEdicion(${indice})"></input></td>
        <td><input type="button" value="Eliminar" class="btn btn-danger" onclick="eliminar(${indice})"></input></td>
    </tr>`
        document.getElementById("tabla-datos").innerHTML += html;
        indice++;
    }
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
function editarAlumno() {
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
function agregarAlumno() {
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
    document.getElementById("tabla-datos").innerHTML = "";
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

//funcion busca por nombre
function buscarAlumno() {
    let buscar = document.getElementById("buscar").value;
    const resultado = array.filter(arr => arr.nombre.includes(buscar.toLowerCase()));
    mostrar(resultado)
}


function filtrarAlumnos() {
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
