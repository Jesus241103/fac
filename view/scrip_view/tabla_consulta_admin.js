document.addEventListener("DOMContentLoaded", () => {
    const tabla       = document.querySelector("#tabla tbody");
    const modalEl     = document.getElementById('staticBackdrop');
    const btnCerrar   = document.getElementById('close_modal');
  
    // 1) Inicializa el modal globalmente
    window.modal = new bootstrap.Modal(modalEl, {
      backdrop: 'static',
      keyboard: false,
      focus: false
    });
  
    //QUITAR EL FOCO DEL MODAL
    modalEl.addEventListener('hidden.bs.modal', () => {
      if (modalEl.contains(document.activeElement))
        document.activeElement.blur()});
    //FOCO DE BTN CLOSE
    btnCerrar.addEventListener('click', () => { btnCerrar.blur()});
  
    window.cargar_productos = async () => {
      try {
        const res = await fetch('/view/productos');
        const { success, data } = await res.json();
        if (success) {
          tabla.innerHTML = "";
          data.forEach((p, i) => tabla.appendChild(crear_fila(p, i+1)));
        }
      } catch (e) {
        mostrar_error("No se pudo conectar: " + e);
      }
    };
    window.cargar_productos();
  
    // 5) Search listener
    document.getElementById("input_busqueda_admin")
            .addEventListener("input", buscar);
            
    actualizar_datos(); // Llama a la función para actualizar datos

  });
  

// Función para crear cada fila
function crear_fila(producto, posicion) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${posicion}</td>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}$</td>
        <td>${producto.iva}%</td>
        <td></td>
        <td></td>
    `;

    const estado_btn = crear_estado(producto.estado);
    const accion_contenedor = cargar_elementos(producto.estado);

    fila.cells[5].appendChild(estado_btn); // Botón de estado visual
    fila.cells[6].appendChild(accion_contenedor); // Botones de acción

    const btn_accion = accion_contenedor.querySelector(".btn2");
    const btn_modificar = accion_contenedor.querySelector(".btn1");
    evento_btn1(btn_modificar, producto); // Evento para modificar
    evento_btn2(btn_accion, producto.estado, estado_btn);

    return fila;
}

// Función para cargar botones de acción
function cargar_elementos(estado) {
    const divContenedor = document.createElement("div");
    const btn_modificar = document.createElement("button");
    const btn_accion = document.createElement("button");
    btn_modificar.textContent = "MODIFICAR";
    btn_modificar.classList.add("btn", "btn-primary", "btntow", "btn1");
    
    btn_accion.textContent = estado === 1 ? "ELIMINAR" : "ACTIVAR";
    btn_accion.classList.add("btn", estado === 1 ? "btn-danger" : "btn-success", "btntow", "btn2");

    divContenedor.classList.add("cont");
    divContenedor.append(btn_modificar, btn_accion);

    return divContenedor;
}

// Función para crear el botón de estado
function crear_estado(estado) {
    const btn_estado = document.createElement("button");

    Object.assign(btn_estado.style, {
        height: "25px",
        width: "10%",
    });

    btn_estado.classList.add("btn", "btntow", "disabled");
    btn_estado.classList.add(estado === 1 ? "btn-success" : "btn-danger");

    return btn_estado;
}

// Evento para el botón de estado
function evento_btn2(btn_accion, estado, estado_btn) {
    btn_accion.dataset.est = estado;

    btn_accion.addEventListener("click", () => {
        const row = btn_accion.closest("tr");
        const id = row.cells[1].textContent;

        // Actualizar el estado en el servidor
        actualizar_estado(id);

        // Alternar estado y actualizar botones
        const nuevoEstado = btn_accion.dataset.est === "0" ? "1" : "0";
        btn_accion.dataset.est = nuevoEstado;

        actualizar_visual(btn_accion, estado_btn, nuevoEstado);
        //window.cargar_productos(); // Recargar productos
    });
}

// Función para actualizar visualmente botones
function actualizar_visual(btn_accion, estado_btn, nuevoEstado) {
    // Actualizar botón de acción
    btn_accion.textContent = nuevoEstado === "1" ? "ELIMINAR" : "ACTIVAR";
    btn_accion.classList.toggle("btn-danger", nuevoEstado === "1");
    btn_accion.classList.toggle("btn-success", nuevoEstado === "0");

    // Actualizar botón de estado
    estado_btn.classList.toggle("btn-success", nuevoEstado === "1");
    estado_btn.classList.toggle("btn-danger", nuevoEstado === "0");
}

// Barra de búsqueda
function buscar() {
    const input_txt = document.getElementById("input_busqueda_admin").value.toLowerCase();
    const filas = document.querySelectorAll("#tabla tbody tr");

    filas.forEach(fila => {
        const texto = fila.cells[2]?.textContent.toLowerCase();
        fila.style.display = texto.includes(input_txt) ? "" : "none";
    });
}

// Mostrar error usando SweetAlert
function mostrar_error(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: mensaje,
    });
}

// Función para actualizar el estado en el servidor
function actualizar_estado(id) {
    fetch(`/view/producto/${id}`, { method: "PATCH" })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(`Estado actualizado para ID: ${id}`);
            } else {
                console.error("Error al actualizar el estado:", data);
            }
        })
        .catch(error => {
            console.error("Error de conexión:", error);
        });
}

//EVENTO BTN MODIFICAR
function evento_btn1(btn_modificar, producto) {
    btn_modificar.addEventListener("click", () => {
        const id = document.getElementById("idX");
        const nombre = document.getElementById("nombreX");
        const precio = document.getElementById("precioX");
        const iva = document.getElementById("ivaX");
        id.value = producto.id;
        nombre.value = producto.nombre;
        precio.value = producto.precio;
        iva.value = producto.iva;

        window.modal.show();
        document.getElementById("titulo_modal").focus();
    });
}


async function actualizar_datos() {
    const send = document.getElementById("modal_send");
    send.addEventListener("click", async () => {
      // 1) Leer el id del input deshabilitado
      const id     = document.getElementById("idX").value;
      const name   = document.getElementById("nombreX").value.trim();
      const precio = document.getElementById("precioX").value.trim();
      const iva    = document.getElementById("ivaX").value.trim();
  
      // 2) Método PATCH a /view/actualizacion/:id
      try {
        const response = await fetch(`/view/actualizacion/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, precio, iva })
        });
  
        const result = await response.json();
        if (result.success) {
          Swal.fire({
            icon: "success",
            title: "Modificación exitosa",
            text: result.message || "Actualizado correctamente."
          });
          window.modal.hide(); // Cierra el modal
          window.cargar_productos(); // Recarga la tabla
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.error || "No se pudo actualizar."
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar al servidor."
        });
      }
    });
  }
  
  // Regístralo una sola vez
  document.addEventListener("DOMContentLoaded", actualizar_datos);  