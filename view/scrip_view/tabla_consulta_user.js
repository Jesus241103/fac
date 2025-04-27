document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.querySelector("#tabla_user tbody");
  const cargar_productos = async () => {
    try {
      const response = await fetch("/view/productos");
      const data = await response.json();
      if (data.success) {
        tabla.innerHTML = ""; // Limpiar tabla antes de llenarla
        let posicion_i = 0;
        data.data.forEach((producto) => {
          posicion_i += 1;
          if (producto.estado == 1) {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                        <td>${posicion_i}</td>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.precio + "$"}</td>
                        <td>${producto.iva + "%"}</td>
                        <td></td>
                        `;
            tabla.appendChild(fila);
            evento_switch(tabla, fila, data);
            if (data.data.length >= 10) 
              tabla.classList.add("scrolling");
            else 
              tabla.classList.remove("scrolling");
          }
        });
        
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar al servidor.",
      });
    }
  };
  cargar_productos();
  document.getElementById("input_busqueda").addEventListener("input", buscar);
});

//BARRA DE BUSQUEDA
function buscar() {
  let input_txt = document
    .getElementById("input_busqueda")
    .value.toString()
    .toLowerCase();
  let tabla_body = document.getElementById("tbody_productos");
  let fila = tabla_body.getElementsByTagName("tr");
  for (let i = 0; i < fila.length; i++) {
    let consulta_txt = fila[i].cells[2]?.textContent.toString().toLowerCase();
    if (consulta_txt.includes(input_txt)) {
      fila[i].style.display = ""; // Mostrar fila
    } else {
      fila[i].style.display = "none"; // Ocultar fila
    }
  }
}
//CREAR INTERRUPTOR
function evento_switch(obj, fila, data) {
  const datas = data;
  const divContenedor = document.createElement("div");
  const boton = document.createElement("input");
  const inputCantidad = document.createElement("input");
  divContenedor.classList.add("form-check", "form-switch");
  boton.type = "checkbox";
  boton.classList.add("form-check-input");
  divContenedor.appendChild(boton);
  obj.querySelector("tr:last-child td:last-child").appendChild(divContenedor);
  //AGREGO EVENTO
  boton.addEventListener("change", () => {
    const celdas = fila.querySelectorAll("td");
    const nuevaFila = document.createElement("tr");
    boton.disabled = true;
    boton.classList.add("disabled");
    nuevaFila.innerHTML = `
        <td>${celdas[2].textContent}</td>
        <td>${celdas[3].textContent}</td>
        <td>${celdas[4].textContent}</td>
        <td></td>
        `;
    cargar_lista(nuevaFila, boton, datas, inputCantidad);
    calcular_sub();
    contar_celdas();
  });
}
//CARGAR NUEVA LISTA
function cargar_lista(nuevaFila, boton, data, inputCantidad) {
  const tabla_lista = document.querySelector("#tabla_lista tbody");
  tabla_lista.appendChild(nuevaFila);
  crear_input(nuevaFila, boton, inputCantidad);
  if (data.data.length >= 10) 
    tabla_lista.classList.add("scrolling");
  else 
    tabla_lista.classList.remove("scrolling");
}
//CREAR INPUT DE CANTIDAD Y BOTON X
function crear_input(nuevaFila, boton, inputCantidad) {
  const divContenedor = document.createElement("div");
  const img = document.createElement("img");
  Object.assign(inputCantidad.style, {
    height: "25px", fontSize: "small", width: "50%"});
    inputCantidad.value = 1;inputCantidad.type = "number"; inputCantidad.classList.add("input_cantidad");
    inputCantidad.classList.add("form-control"); inputCantidad.min = 1; inputCantidad.max = 100;
  Object.assign(divContenedor.style, {
      display:"flex", justifyContent:"flex-end", alignItems:"center", width:"90%"});
  Object.assign(img.style, {
      cursor:"pointer", height:"20px", width:"15px"});
  img.style.marginLeft="10px";
  img.src = "./img/x.png";
  inputCantidad.addEventListener("input", () => {
    calcular_sub();
    contar_celdas();
  });
  //AGREGAR EVENTO A X
  img.addEventListener("click", () => {
    const tabla_lista = document.querySelector("#tabla_lista tbody");
    tabla_lista.removeChild(nuevaFila);
    boton.disabled = false;
    boton.checked= false;
    calcular_sub();
    contar_celdas();
  });
  divContenedor.appendChild(inputCantidad);
  divContenedor.appendChild(img);
  nuevaFila.lastElementChild.appendChild(divContenedor);
}
//PRECIO X CANTIDAD Y ACUMULAR
function calcular_sub() {
  const filas = document.querySelectorAll("#tabla_lista tbody tr");
  let suma = 0;
  filas.forEach(fila => {
    const precio = parseFloat(fila.cells[1].textContent) || 0;
    const cantidadInput = fila.querySelector(".input_cantidad");
    const cantidad = parseFloat(cantidadInput.value) || 0;
    suma += precio * cantidad;
  });
  document.getElementById("sub").innerHTML = `SUB TOTAL:<br>${suma.toFixed(2)}`;
}

//CONTAR
function contar_celdas() {
  const inputs = document.querySelectorAll(".input_cantidad");
  const cantidadLabel = document.getElementById("cantidad");
  let total = 0;
  const actualizarTotal = () => {
    total = 0;
    inputs.forEach(input => {
      total += Number(input.value) || 0;
    });
    cantidadLabel.innerHTML = `UNIDADES:<br>${total}`;
  };
  actualizarTotal();
}