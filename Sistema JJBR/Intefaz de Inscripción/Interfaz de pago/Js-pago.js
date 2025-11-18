// ------------------ VERIFICACIÓN DE COMPROBANTE ------------------

const comprobanteInput = document.getElementById("comprobante");
const verificarBtn = document.getElementById("verificar-btn");
const registro = document.getElementById("registro");

comprobanteInput.addEventListener("change", () => {
    const file = comprobanteInput.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    // Validar tipo
    if (!allowed.includes(file.type)) {
        alert("Formato no permitido. Solo JPG, PNG o PDF.");
        comprobanteInput.value = "";
        verificarBtn.disabled = true;
        return;
    }

    // Validar tamaño
    if (file.size > maxSize) {
        alert("El archivo es demasiado grande. Máx. 10 MB.");
        comprobanteInput.value = "";
        verificarBtn.disabled = true;
        return;
    }

    // Simular “archivo válido”
    verificarBtn.disabled = false;
});

verificarBtn.addEventListener("click", () => {
    verificarBtn.textContent = "Verificando...";
    verificarBtn.disabled = true;

    setTimeout(() => {
        alert("✓ Comprobante verificado correctamente.");
        registro.style.display = "block";

        // Crear matrícula aleatoria
        document.getElementById("matricula").value =
            "MU-" + Math.floor(Math.random() * 90000 + 10000);

    }, 1300);
});

// ------------------ VALIDACIÓN DE CONTRASEÑA ------------------

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const guardarBtn = document.getElementById("guardar-btn");
const barra = document.querySelector(".strength-fill");

// Lista básica de contraseñas comunes
const contraseñasMalas = [
    "123456", "password", "qwerty", "abc123", "111111",
    "letmein", "admin", "123123", "user"
];

password.addEventListener("input", () => {
    const valor = password.value;
    actualizarBarra(valor);
});

function actualizarBarra(pass) {
    let puntos = 0;

    // Reglas de seguridad
    if (pass.length >= 8) puntos++;
    if (/[a-z]/.test(pass)) puntos++;
    if (/[A-Z]/.test(pass)) puntos++;
    if (/[0-9]/.test(pass)) puntos++;
    if (/[^A-Za-z0-9]/.test(pass)) puntos++;

    // Evita secuencias
    if (!/(0123|1234|2345|abcd|bcde|cdef)/i.test(pass)) puntos++;

    // Evita repeticiones largas
    if (!/(.)\1{3,}/.test(pass)) puntos++;

    // Evita contraseñas comunes
    if (!contraseñasMalas.includes(pass.toLowerCase())) puntos++;

    // Valores: 1-3 baja, 4-5 media, 6-8 fuerte
    if (puntos <= 3) {
        barra.style.width = "33%";
        barra.style.background = "red";
    } else if (puntos <= 5) {
        barra.style.width = "66%";
        barra.style.background = "orange";
    } else {
        barra.style.width = "100%";
        barra.style.background = "green";
    }
}

// ------------------ GUARDAR DATOS ------------------

const tarjetaFinal = document.getElementById("tarjeta-final");

guardarBtn.addEventListener("click", () => {
    const pass = password.value;
    const confirm = confirmPassword.value;

    if (pass.length < 8) {
        alert("La contraseña debe tener mínimo 8 caracteres.");
        return;
    }

    if (pass !== confirm) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Muestra tarjeta final
    document.getElementById("tarjeta-matricula").textContent =
        document.getElementById("matricula").value;

    document.getElementById("tarjeta-password").textContent = pass;

    tarjetaFinal.style.display = "block";
});

// ------------------ COPIAR TEXTO ------------------

function copiarTexto(id) {
    const texto = document.getElementById(id).textContent;
    navigator.clipboard.writeText(texto);
    alert("Copiado: " + texto);
}

// ------------------ FINALIZAR ------------------

document.getElementById("finalizar-btn").addEventListener("click", () => {
    alert("¡Registro completado!");
    window.location.href = "";
});

