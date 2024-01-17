/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    // Recuperar tareas almacenadas al cargar la página
    cargarTareas();

    $("#addTask").on("click", afegir_tasca);
}

function afegir_tasca() {
    var text = prompt("Afegir tasca:");
    if (text !== null && text.trim() !== "") {
        // Crear elemento de la lista
        var $elem = $("<li><a href='#" + text + "'>" + text + "</a></li>");
        var $deleteBtn = $("<button class='deleteTask'>Delete</button>");
        var $editBtn = $("<button class='editTask'>Edit</button>");

        $elem.append($deleteBtn);
        $elem.append($editBtn);

        // Agregar tarea a localStorage
        agregarTarea(text);

        // Agregar tarea a la lista
        $("ul").append($elem);

        // Crear página correspondiente a la tarea
        crearPaginaTarea(text);

        // Refrescar diseño de jQuery Mobile
        $('ul[data-role="listview"]').listview('refresh');
    }
}

$(document).on("click", ".deleteTask", function() {
    // Eliminar tarea del localStorage
    eliminarTarea($(this).siblings('a').text());

    // Eliminar tarea de la lista
    $(this).closest("li").remove();

    // Refrescar diseño de jQuery Mobile
    $('ul[data-role="listview"]').listview('refresh');
});

$(document).on("click", ".editTask", function() {
    var tareaAntigua = $(this).siblings('a').text();
    var newText = prompt("Edit task:", tareaAntigua);
    if (newText !== null && newText.trim() !== "") {
        // Actualizar texto de la tarea en la lista
        $(this).siblings('a').text(newText);

        // Actualizar tarea en localStorage
        actualizarTarea(tareaAntigua, newText);

        // Actualizar contenido de la página correspondiente a la tarea
        actualizarContenidoPagina(tareaAntigua, newText);
    }
    // Aquí podrías agregar lógica adicional si también deseas editar la página correspondiente
});

function eliminar_tasca() {
    var text = prompt("Eliminar tasca:");
    if (text !== null && text.trim() !== "") {
        // Eliminar tarea del localStorage
        eliminarTarea(text);

        // Eliminar tarea de la lista
        $("ul li a").filter(function() {
            return $(this).text() === text;
        }).closest("li").remove();

        // Refrescar diseño de jQuery Mobile
        $('ul[data-role="listview"]').listview('refresh');
    }
}

// Función para agregar tarea a localStorage
function agregarTarea(texto) {
    var tareas = obtenerTareas();
    tareas.push(texto);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para obtener tareas de localStorage
function obtenerTareas() {
    var tareasJSON = localStorage.getItem('tareas');
    return tareasJSON ? JSON.parse(tareasJSON) : [];
}

// Función para cargar tareas al iniciar la aplicación
function cargarTareas() {
    var tareas = obtenerTareas();
    tareas.forEach(function(tarea) {
        // Crear elemento de la lista
        var $elem = $("<li><a href='#" + tarea + "'>" + tarea + "</a></li>");
        var $deleteBtn = $("<button class='deleteTask'>Delete</button>");
        var $editBtn = $("<button class='editTask'>Edit</button>");

        $elem.append($deleteBtn);
        $elem.append($editBtn);

        // Agregar tarea a la lista
        $("ul").append($elem);

        // Crear página correspondiente a la tarea
        crearPaginaTarea(tarea);
    });

    // Refrescar diseño de jQuery Mobile
    $('ul[data-role="listview"]').listview('refresh');
}

// Función para actualizar tarea en localStorage
function actualizarTarea(textoViejo, textoNuevo) {
    var tareas = obtenerTareas();
    var index = tareas.indexOf(textoViejo);
    if (index !== -1) {
        tareas[index] = textoNuevo;
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}

// Función para eliminar tarea de localStorage
function eliminarTarea(texto) {
    var tareas = obtenerTareas();
    var index = tareas.indexOf(texto);
    if (index !== -1) {
        tareas.splice(index, 1);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}
// Función para actualizar contenido de la página correspondiente a la tarea
function actualizarContenidoPagina(textoViejo, textoNuevo) {
    var $pagina = $("#" + textoViejo);
    if ($pagina.length) {
        $pagina.find('h1').text(textoNuevo);
        $pagina.find('.ui-content p').text("This is " + textoNuevo);
        // También puedes realizar otras actualizaciones según sea necesario
    }
}

// Función para crear página correspondiente a la tarea
function crearPaginaTarea(texto) {
    var $page = $("<div data-role='page' id='" + texto + "'></div>");
    var $header = $("<div data-role='header'><a href='#' data-icon='back' data-rel='back' title='Go back'>Back</a><h1>" + texto + "</h1></div>");
    var $content = $("<div class='ui-content'><p>This is " + texto + "</p></div>");
    var $footer = $("<div data-role='footer' data-position='fixed'><h1>" + texto + "</h1></div>");

    $page.append($header);
    $page.append($content);
    $page.append($footer);

    $("body").append($page);
}
