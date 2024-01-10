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

    $("#addTask").on("click", afegir_tasca);
}
function afegir_tasca() {
    var text = prompt("Afegir tasca:");
    if (text !== null && text.trim() !== "") {
        var $elem = $("<li><a href='#" + text + "'>" + text + "</a></li>");

        var $deleteBtn = $("<button class='deleteTask'>Delete</button>");
        var $editBtn = $("<button class='editTask'>Edit</button>");

        $elem.append($deleteBtn);
        $elem.append($editBtn);

        $("ul").append($elem);

        var $page = $("<div data-role='page' id='" + text + "'></div>");
        var $header = $("<div data-role='header'><a href='#' data-icon='back' data-rel='back' title='Go back'>Back</a><h1>" + text + "</h1></div>");
        var $content = $("<div class='ui-content'><p>This is " + text + "</p></div>");
        var $footer = $("<div data-role='footer' data-position='fixed'><h1>" + text + "</h1></div>");

        $page.append($header);
        $page.append($content);
        $page.append($footer);

        $("body").append($page);

        $('ul[data-role="listview"]').listview('refresh');
    }
}
$(document).on("click", ".deleteTask", function() {
    $(this).closest("li").remove();
    // Aquí podrías agregar lógica adicional si también deseas eliminar la página correspondiente
});

$(document).on("click", ".editTask", function() {
    var newText = prompt("Edit task:", $(this).siblings('a').text());
    if (newText !== null && newText.trim() !== "") {
        $(this).siblings('a').text(newText);
    }
    // Aquí podrías agregar lógica adicional si también deseas editar la página correspondiente
});

function eliminar_tasca() {
    var text = prompt("Eliminar tasca:");
    if (text !== null && text.trim() !== "") {
        $("ul li a").filter(function() {
            return $(this).text() === text;
        }).closest("li").remove();

        // Refrescar el diseño de jQuery Mobile después de eliminar el elemento
        $('ul[data-role="listview"]').listview('refresh');
    }
}
