import { array1, array } from './base.js';
import { agregarAlumno, editarAlumno, filtrarAlumnos, buscarAlumno, alCargar, mostrar, mostrarNotas } from './funciones.js';
import { inputAgregar, guardar, filtrar, buscartxt } from './selectores.js';



//EVENTOS


        // cargamos los datos
        document.addEventListener("DOMContentLoaded", () => {
            let arrayJSON = JSON.parse(localStorage.getItem('Alumno')) || [];

            if (arrayJSON.length == 0) { //si localstorage esta vacio cargamos array1
                alCargar(array1)
            }
            else {
                alCargar(arrayJSON)//cargamos datos de localstorage
            }
            mostrar(array);
        });

        //boton agregar Alumno
        inputAgregar?.addEventListener("click", () => {
            agregarAlumno();
        });

        //boton guarda nuevo alumno
        guardar?.addEventListener("click", () => {
            editarAlumno();
        });

        //select filtra alumnos
        filtrar?.addEventListener("click", () => {
            filtrarAlumnos();
        });

        //busca al ir escribiendo
        buscartxt?.addEventListener("input", (e) => {
            buscarAlumno(e.target.value);
        });


        //cargamos el array notas
        document.addEventListener('DOMContentLoaded', () => {
            mostrarNotas(array)
        });
