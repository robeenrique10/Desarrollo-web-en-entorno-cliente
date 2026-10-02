// Función para eliminar espacios en blanco tanto al inicio como al final
function trim(cadena) {
    return cadena.trim();
}

// 1. Validación de texto
function validarTexto(texto, minLetras) {
    const valor = texto.trim();
    if (valor.length === 0) {
        return { valido: false, msj: "Campo obligatorio." };
    }

    // Validación de solo letras, tildes, ñ y espacios
    const reglaSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!reglaSoloLetras.test(valor)) {
        return { valido: false, msj: "Solo se admiten letras." };
    }

    // Cuenta de las letras que tiene el texto en concreto
    const reemplazarEspacios = valor.replace(/\s+/g, "");
    if (reemplazarEspacios.length < minLetras) {
        return { valido: false, msj: `Debe contener al menos ${minLetras} letras.` };
    }

    return { valido: true, msj: "" };
}

// 2. Validación del DNI
function validarDNI(dni) {
    const valor = dni.trim().toUpperCase();
    if (valor.length === 0) {
        return { valido: false, msj: "Campo obligatorio." };
    }

    // Formato DNI
    const reglaDNI = /^\d{8}[A-Z]$/;
    if (!reglaDNI.test(valor)) {
        return { valido: false, msj: "El formato de este campo es incorrecto (8 números y 1 letra)." };
    }

    // Cálculo de la letra para cada DNI
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const numero = parseInt(valor.substring(0, 8), 10);
    const letraIngresada = valor.charAt(8);
    const letraCorrecta = letras.charAt(numero % 23);

    if (letraIngresada !== letraCorrecta) {
        return { valido: false, msj: `La letra ${letraCorrecta} no corresponde a este DNI.` };
    }

    return { valido: true, msj: "" };
}

// 3. Validación de la sugerencia
function validarSugerencia(texto) {
    // CORREGIDO: Se añade .length para validar si está vacío
    if (texto.trim().length === 0) {
        return { valido: false, msj: "Campo obligatorio." };
    }

    return { valido: true, msj: "" };
}

// 4. Validación de la fecha
function validarFecha(d, m, a) {
    const diaStr = d.trim();
    const mesStr = m.trim();
    const anoStr = a.trim();

    if (!diaStr || !mesStr || !anoStr) {
        return { valido: false, msj: "Debes rellenar día, mes y año." };
    }

    if (!/^\d{1,2}$/.test(diaStr) || !/^\d{1,2}$/.test(mesStr) || !/^\d{4}$/.test(anoStr)) {
        return { valido: false, msj: "Formato no válido (dd/mm/aaaa)." };
    }

    const dia = parseInt(diaStr, 10);
    const mes = parseInt(mesStr, 10);
    const ano = parseInt(anoStr, 10);

    const fechaObj = new Date(ano, mes - 1, dia);

    if (
        fechaObj.getFullYear() !== ano ||
        fechaObj.getMonth() !== (mes - 1) ||
        fechaObj.getDate() !== dia
    ) {
        return { valido: false, msj: "La fecha no existe en el calendario." };
    }

    return { valido: true, msj: "" };
}

// 5. Validar Estatura
function validarEstatura(estatura) {
    const valorStr = estatura.trim().replace(',', '.');
    if (valorStr.length === 0) return { valido: false, msj: "La estatura es obligatoria." };

    const num = parseFloat(valorStr);
    if (isNaN(num) || !/^\d+(\.\d+)?$/.test(valorStr)) {
        return { valido: false, msj: "Debe ser un número válido." };
    }

    if (num < 0.50 || num > 2.50) {
        return { valido: false, msj: "Estatura fuera de rango (entre 0.50 y 2.50 m)." };
    }

    return { valido: true, msj: "" };
}

// 6. Validar Cuenta
function validarCCC(ccc) {
    const valor = ccc.trim();
    if (valor.length === 0) return { valido: false, msj: "La cuenta corriente es obligatoria." };

    if (!/^\d{20}$/.test(valor)) {
        return { valido: false, msj: "Debe contener exactamente 20 dígitos sin espacios ni letras." };
    }

    return { valido: true, msj: "" };
}