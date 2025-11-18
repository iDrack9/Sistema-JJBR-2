// JS FINAL — FIXED (SIN NaN, con semanas reales)

// -----------------------------
// CONFIGURACIONES
// -----------------------------
const precioHora = 300;

// -----------------------------
// ELEMENTOS DEL DOM
// -----------------------------
const tipoAsesoria = document.getElementById("tipo-asesoria");

// Materias
const materiasSection = document.getElementById("materias-section");
const materiasCheckboxes = materiasSection.querySelectorAll("input[type='checkbox']");

// Días
const diasSemanaChecks = document.querySelectorAll(".dia-semana");

// Duración
const semanasInput = document.getElementById("semanas-input");
const mesesInput = document.getElementById("meses-input");
const totalDiasDisplay = document.getElementById("total-dias");
const totalDiasResumen = document.getElementById("total-dias-resumen");

// Horas por día (botones)
const horasButtons = document.querySelectorAll(".horario-btn");

// Horario exacto
const horarioSelect = document.getElementById("horario-exacto");

// Resumen
const totalHorasDisplay = document.getElementById("total-horas");
const totalPrecioDisplay = document.getElementById("total-precio");

// Botón pagar
const pagarBtn = document.getElementById("pagar-btn");

// Variables internas
let horasPorDia = 0;

// -----------------------------
// BLOQUEAR MATERIAS
// -----------------------------
tipoAsesoria.addEventListener("change", () => {
    const tipo = tipoAsesoria.value;

    if (tipo === "exani" || tipo === "personalizada") {
        materiasSection.classList.add("deshabilitado");
        materiasCheckboxes.forEach(m => {
            m.checked = false;
            m.disabled = true;
        });
    } else {
        materiasSection.classList.remove("deshabilitado");
        materiasCheckboxes.forEach(m => (m.disabled = false));
    }

    actualizarTotales();
});

// -----------------------------
// HORAS POR DÍA (BOTONES)
// -----------------------------
horasButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        horasButtons.forEach(b => b.classList.remove("seleccionado"));

        btn.classList.add("seleccionado");

        // Obtener horas desde h1, h2, h3, h4
        horasPorDia = parseInt(btn.id.replace("h", "")) || 0;

        generarHorariosDisponibles();
        actualizarTotales();
    });
});

// -----------------------------
// HORARIOS DISPONIBLES
// -----------------------------
function generarHorariosDisponibles() {
    horarioSelect.innerHTML = "";

    if (horasPorDia === 0) return;

    const inicio = 8;
    const fin = 20;

    for (let h = inicio; h <= fin - horasPorDia; h++) {
        let opcion = document.createElement("option");
        opcion.value = `${h}-${h + horasPorDia}`;
        opcion.textContent = `${formatoHora(h)} — ${formatoHora(h + horasPorDia)}`;
        horarioSelect.appendChild(opcion);
    }
}

function formatoHora(h) {
    const sufijo = h >= 12 ? "pm" : "am";
    const hora = h > 12 ? h - 12 : h;
    return `${hora}:00 ${sufijo}`;
}

// -----------------------------
// CALCULAR DÍAS TOTALES (CON SEMANAS REALES)
// -----------------------------
function calcularDiasTotales() {
    const diasSeleccionados = Array.from(diasSemanaChecks).filter(c => c.checked).length;

    if (diasSeleccionados === 0) {
        totalDiasDisplay.textContent = 0;
        totalDiasResumen.textContent = 0;
        return 0;
    }

    let semanasVisual = parseInt(semanasInput.value) || 0;
    let mesesVisual = parseInt(mesesInput.value) || 0;

    // Semanas reales internas
    let semanasReales = (mesesVisual * 4) + semanasVisual;

    // Transformación automática a semanas/meses visibles
    let mesesCalculados = Math.floor(semanasReales / 4);
    let semanasCalculados = semanasReales % 4;

    mesesInput.value = mesesCalculados;
    semanasInput.value = semanasCalculados;

    // Días totales finales
    let diasTotales = semanasReales * diasSeleccionados;

    totalDiasDisplay.textContent = diasTotales;
    totalDiasResumen.textContent = diasTotales;

    return diasTotales;
}

// -----------------------------
// ACTUALIZAR HORAS Y PRECIO
// -----------------------------
function actualizarTotales() {
    const dias = calcularDiasTotales();
    const horasDia = horasPorDia || 0;

    const totalHoras = dias * horasDia;
    totalHorasDisplay.textContent = totalHoras;

    const totalPagar = totalHoras * precioHora;
    totalPrecioDisplay.textContent = `$${totalPagar} MXN`;
}

// -----------------------------
// LISTENERS
// -----------------------------
diasSemanaChecks.forEach(check => check.addEventListener("change", actualizarTotales));
semanasInput.addEventListener("input", actualizarTotales);
mesesInput.addEventListener("input", actualizarTotales);
horarioSelect.addEventListener("change", actualizarTotales);

// -----------------------------
// PAGO
// -----------------------------
pagarBtn.addEventListener("click", () => {
    alert("Redirigiendo a pago...");
    window.location.href = "file:///D:/brand/Documents/Tareas/PROGRAMACI%C3%93N%20ORIENTADA%20A%20OBJETOS/Sistema%20JJBR/Intefaz%20de%20Inscripci%C3%B3n/Interfaz%20de%20pago/Interfaz-pago.html";
});

// -----------------------------
// INICIALIZACIÓN
// -----------------------------
actualizarTotales();
