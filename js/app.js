var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
}

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  // aqui agregamos los eventos
  cargarTareas ();
  $(document).on("click", ".eliminar", pruebaBorrar);
  $("#add-form").submit(agregarTarea);
};

/*var cargarTareas = function () {
  // $.getJSON(api.url, function(response){
  $.getJSON(api.url, function(tareas){

    var $taskList = $("#task-list");

    tareas.forEach(function(tarea){
      var nombre = tarea.name;
      var estado = tarea.status[0];
      //creamos la fila
      var $tr = $("<tr>");
      //creamos la celda del nombre
      var $nombreTd = $("<td>");
      //creamos la celda del estado
      var $estadoTd = $("<td>");
      $estadoTd.text(estado);

      $tr.append($nombreTd);
      $tr.append($estadoTd);

      $taskList.append($tr);

    });
  });
}*/

/*var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {

    var $tasksList = $("#tasks-list");

    tareas.forEach(function (tarea) {
      var nombre = tarea.name;
      var estado = tarea.status[0];
      // creamos la fila
      var $tr = $("<tr />");
      // creamos la celda del nombre
      var $nombreTd = $("<td />");
      $nombreTd.text(nombre);
      // creamos la celda del estado
      var $estadoTd = $("<td />");
      $estadoTd.text(estado);
      // agregamos las celdas a la fila
      $tr.append($nombreTd);
      $tr.append($estadoTd);
      // agregamos filas a la tabla
      $tasksList.append($tr);
    });
  });
}*/

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}

var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
  //creamos la celda de acciones
  var $acciones = $("<td>");

  var $buscar = $("<button>", {"class":"btn btn-primary glyphicon glyphicon-eye-open"});
  var $editar = $("<button>", {"class": "btn btn-primary glyphicon glyphicon-pencil"});
  var $eliminar = $("<button>", {"class": "btn btn-primary glyphicon glyphicon-remove-circle eliminar"});

  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append($acciones);

  $acciones.append($buscar);
  $acciones.append($editar);
  $acciones.append($eliminar);


  // agregamos filas a la tabla
  $tasksList.append($tr);
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

function pruebaBorrar(e){
  var elemento = $(e.target);
  var padre = elemento.parent().parent();

  // console.log(id);
  var id = padre.data('clave');
  padre.remove();

  var url_id = api.url + id;
  console.log(url_id);
  $.ajax({
    url: url_id,
    type: "DELETE",
    success: function (data){
      cargarTareas();
    }

  });


}



$(document).ready(cargarPagina);
