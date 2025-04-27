function obtener_fecha() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0"); // Asegura formato de dos dígitos
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes ajustado
    const anno = fecha.getFullYear();
    const hora = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const x =`${hora}:${minutos} ${dia}/${mes}/${anno}`;
    return x;
}

const generar = document.getElementById("generar_factura");
generar.addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const fecha = obtener_fecha();
    const cantidad = (document.getElementById("cantidad").textContent.trim());
    const sub = (document.getElementById("sub").textContent.trim());
    const data = { cedula, nombre, direccion, cantidad, sub, fecha };

    try {
        const response = await fetch("/post/factura", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Factura generada",
                text: "La factura se ha generado correctamente.",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.error || "No se pudo generar la factura.",
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo conectar al servidor.",
        });
    }
});