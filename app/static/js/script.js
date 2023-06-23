$(document).ready(function() {
    // Función para cargar los clientes en la tabla
    function cargarTablaClientes() {     
      // Realizar una solicitud GET a la API para obtener los clientes
      fetch('http://localhost:5000/api/getClientes')
      .then(response => response.json())
      .then(response => {
  
        var html = '';
        response.forEach(cliente => {
          var id = cliente.id;
          var nombre = cliente.nombre;
          var direccion = cliente.direccion;
          var telefono = cliente.telefono;
          var correo = cliente.correo;
    
          html += '<tr>';
          html += '<td>' + nombre + '</td>';
          html += '<td>' + direccion + '</td>';
          html += '<td>' + telefono + '</td>';
          html += '<td>' + correo + '</td>';
          html += '<td>' + '<button class="btn btn-primary btn-sm modificar-btn" data-id="' + id + '" data-toggle="modal" data-target="#modalEditar">Modificar</button>' + '</td>';
          html += '<td>' + '<button class="btn btn-danger btn-sm" data-id="' + id + '">Eliminar</button>' + '</td>';
          html += '</tr>';
  
        });
    
        $('#tabla-clientes tbody').html(html);  
  
        $('.modificar-btn').click(function() {
          var id = $(this).data('id');
          mostrarFormularioModificar(id);
        });
    
        $('.btn-danger').click(function() {
          var id = $(this).data('id');
          if (id !== undefined) {
            confirmarEliminarCliente(id);
          }
        });
        
      })
      .catch(error => mostrarMensaje('Error', 'Error al cargar los clientes. '));
    }  
  
    // Función para mostrar el formulario de modificación con los datos del cliente
    function mostrarFormularioModificar(id) {
  
      $.ajax({
        url: 'http://localhost:5000/api/getCliente/' + id,
        method: 'GET',
        dataType: 'json',
        success: function(cliente) {
          $('#clienteId').val(cliente.id);
          $('#nombreEdit').val(cliente.nombre);
          $('#direccionEdit').val(cliente.direccion);
          $('#telefonoEdit').val(cliente.telefono);
          $('#correoEdit').val(cliente.correo);
          
          $('#modalEditar').modal('show');
        },
        error: function(xhr, status, error) {
          mostrarMensaje('Error', xhr.response);
        }
      });
    }
  
    // Función para confirmar la eliminación de un cliente
    function confirmarEliminarCliente(id) {
      // Realizar una solicitud AJAX para obtener los datos del cliente usando el ID
      $.ajax({
        url: 'http://localhost:5000/api/getCliente/' + id,
        method: 'GET',
        dataType: 'json',
        success: function(cliente) {
          // Actualizar los párrafos con los datos del cliente
          $('#nombreEliminar').text(cliente.nombre);
          $('#direccionEliminar').text(cliente.direccion);
          $('#telefonoEliminar').text(cliente.telefono);
          $('#correoEliminar').text(cliente.correo);
          // Actualiza el valor del campo oculto con el ID del cliente
          $('#clienteIdEliminar').val(cliente.id);
          
          $('#modalEliminar').modal('show');
        },
        error: function(xhr, status, error) {
          mostrarMensaje('Error', 'Error al obtener los datos del cliente para eliminar.');
        }
      });
  
    }
  
    // Función para eliminar un cliente
    function eliminarCliente(id) {
      $.ajax({
        url: 'http://localhost:5000/api/deleteCliente/' + id,
        method: 'DELETE',
        dataType: 'json',
        success: function(response) {
          cargarTablaClientes();  
          $('#modalEliminar').modal('hide');
          mostrarMensaje('Operación exitosa', response.message);      
        },
        error: function(xhr, status, error) {
          mostrarMensaje('Error', 'Error al eliminar el cliente.');
        }
      });
    }
  
    // Función para mostrar mensajes de éxito o error
    function mostrarMensaje(titulo, mensaje) {
      var modal = $('#mensajeModal');
      $('#mensajeModalLabel').text(titulo);
      $('#mensajeModal .modal-body').text(mensaje);
      $('#mensajeModal').modal('show');
    }
  
    // Evento de submit para agregar un cliente
    $('#formulario-agregar-cliente').submit(function(event) {
      event.preventDefault();
    
      // Obtener referencias a los campos del formulario
      var nombreInput = document.getElementById('nombre');
      var direccionInput = document.getElementById('direccion');
      var telefonoInput = document.getElementById('telefono');
      var correoInput = document.getElementById('correo');
    
      // Validar los campos del formulario
      var mensajeError = validarCampos(nombreInput, direccionInput, telefonoInput, correoInput);
    
      // Mostrar mensaje de error o agregar el cliente
      if (mensajeError !== '') {
        mostrarMensaje('Error', mensajeError);
      } else {
        var datosAgregar = {
          nombre: nombreInput.value,
          direccion: direccionInput.value,
          telefono: telefonoInput.value,
          correo: correoInput.value
        };
    
        fetch('http://localhost:5000/api/addCliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosAgregar)
        })
        .then(function(response) {
          if (response.ok) {
            cargarTablaClientes();
            mostrarMensaje('Operación exitosa', 'Cliente agregado correctamente.');
          } else {
            mostrarMensaje('Error', 'Error al agregar el cliente.');
          }
        })
        .catch(function(error) {
          mostrarMensaje('Error', 'Error al agregar el cliente.');
        });
    
        $('#formulario-agregar-cliente')[0].reset();
      }
    });
    
  
    // Evento de submit para actualizar un cliente
    $('#formularioEditar').submit(function(event) {
      event.preventDefault();
  
      if (validarFormulario()) {
        var idEditar = document.getElementById('clienteId').value;
  
        var datosModificar = {
          nombre: $('#nombreEdit').val(),
          direccion: $('#direccionEdit').val(),
          correo: $('#correoEdit').val(),
          telefono: $('#telefonoEdit').val()
        };
  
        $.ajax({
          url: 'http://localhost:5000/api/updateCliente/' + idEditar,
          method: 'PUT',
          data: JSON.stringify(datosModificar),
          contentType: 'application/json',
          success: function(response) {
            cargarTablaClientes();
            $('#modalEditar').modal('hide');
            mostrarMensaje('Operación exitosa', response.message);
          },
          error: function(xhr, status, error) {
            mostrarMensaje('Error', 'Error al modificar el cliente.');
          }
        });
      }
    });
  
    
    // Evento de submit para eliminar un cliente
    $('#formularioEliminar').submit(function(event) {
      event.preventDefault();   
      
      // Obtener el ID del cliente a eliminar
      var id = $('#clienteIdEliminar').val();   
      eliminarCliente(id);
    }); 
  
    /* validaciones */
  
    // valida campos
    function validarCampos(nombre, direccion, telefono, correo) {
  
      // Inicializar un array para almacenar los mensajes de error
      var errores = [];
  
      // Validar el campo de nombre
      if (nombre.value.length < 3) {
          errores.push('El nombre debe tener al menos 3 caracteres. \n');
      }
  
      // Validar el campo de dirección
      if (direccion.value.length < 3) {
          errores.push('La dirección debe tener al menos 3 caracteres. \n');
      }
  
      // Validar el campo de teléfono
      var telefono = telefono.value;
      var telefonoPattern = /^\d+$/; // Expresión regular que permite solo números
      if (!telefonoPattern.test(telefono) || telefono.length < 5) {
          errores.push('El teléfono debe contener solo números y tener al menos 5 caracteres. \n');
      }
  
      // Validar el campo de correo utilizando una expresión regular
      var correoPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!correoPattern.test(correo.value)) {
          errores.push('El correo electrónico no es válido.\n');
      }
  
      // Comprobar si hay errores
      if (errores.length > 0) {
          // Construir el mensaje de error
          var mensajeError = errores.join('\n');
          return mensajeError;
      } else {
          // El formulario es válido, retornar un string vacío
          return '';
      }
  
    }
  
    function validarFormulario() {
      var formulario = $('#formularioEditar')[0];
      var errores = false;
      
      // Validar el campo de nombre
      if (formulario.nombreEdit.value.length < 3) {
        formulario.nombreEdit.classList.add('is-invalid'); // Agregar clase de Bootstrap para mostrar el mensaje de error
        formulario.nombreEdit.nextElementSibling.textContent = 'El nombre debe tener al menos 3 caracteres.'; // Mostrar el mensaje de error en el elemento de mensaje de error
        errores = true;
      } else {
        formulario.nombreEdit.classList.remove('is-invalid'); // Quitar la clase de Bootstrap para ocultar el mensaje de error
        formulario.nombreEdit.nextElementSibling.textContent = ''; // Borrar el mensaje de error del elemento de mensaje de error
      }
      
      // Validar el campo de dirección
      if (formulario.direccionEdit.value.length < 3) {
        formulario.direccionEdit.classList.add('is-invalid');
        formulario.direccionEdit.nextElementSibling.textContent = 'La dirección debe tener al menos 3 caracteres.';
        errores = true;
      } else {
        formulario.direccionEdit.classList.remove('is-invalid');
        formulario.direccionEdit.nextElementSibling.textContent = '';
      }
      
      // Validar el campo de teléfono
      var telefono = formulario.telefonoEdit.value;
      var telefonoPattern = /^\d+$/; // Expresión regular que permite solo números
      if (!telefonoPattern.test(telefono) || telefono.length < 5) {
        formulario.telefonoEdit.classList.add('is-invalid');
        formulario.telefonoEdit.nextElementSibling.textContent = 'El teléfono debe contener solo números y tener al menos 5 caracteres.';
        errores = true;
      } else {
        formulario.telefonoEdit.classList.remove('is-invalid');
        formulario.telefonoEdit.nextElementSibling.textContent = '';
      }
      
      // Validar el campo de correo utilizando una expresión regular
      var correoPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!correoPattern.test(formulario.correoEdit.value)) {
        formulario.correoEdit.classList.add('is-invalid');
        formulario.correoEdit.nextElementSibling.textContent = 'El correo electrónico no es válido.';
        errores = true;
      } else {
        formulario.correoEdit.classList.remove('is-invalid');
        formulario.correoEdit.nextElementSibling.textContent = '';
      }
      
      // Si hay errores, devuelve false
      if (errores) {
        return false;
      }
      
      // Si no hay errores, devuelve true
      return true;
    }
    
    // Llamamos a la función para cargar la tabla de clientes al cargar la página
    cargarTablaClientes();  
  });