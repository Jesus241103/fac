document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".nav-link");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
    // Eventos para los botones
    document.getElementById("btn_consultar").addEventListener("click", () => vista_contenedor(".contenedor3"));
    document.getElementById("btn_agregar_lat").addEventListener("click", () => vista_contenedor(".contenedor1"));
    document.getElementById("btn_salir").addEventListener("click", function() {
    window.location.href = "/view/index.html";
});
});

function vista_contenedor(obj) {
    document.querySelectorAll(".contenedor1, .contenedor3").forEach(container => container.style.display = "none");
    // Mostrar solo el contenedor especificado
    document.querySelector(obj).style.display = "block";
}


