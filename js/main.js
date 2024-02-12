var reinasColocadas = 0;

function agregarReina(celda) {
  // Verificar si ya hay una reina en la celda
  var reinaExistente = celda.querySelector(".reina-img");

  // Verificar si hay una reina en la misma fila, columna o diagonal
  var fila = celda.parentNode.rowIndex;
  var columna = celda.cellIndex;

  if (reinaExistente) {
    // Si ya hay una reina, eliminarla
    reinaExistente.remove();
    reinasColocadas--;
    actualizarReinasRestantes();
  } else {
    if (hayReinaEnFilaColumnaDiagonal(fila, columna)) {
      alert("No se puede agregar otra reina en contacto con otra reina.");
    } else {
      // Si no hay una reina y no se han colocado 8 reinas, crear elemento de imagen y agregarla a la celda
      if (reinasColocadas < 8) {
        var img = document.createElement("img");
        img.src = document.getElementById("selectorImagen").value;
        img.alt = "Reina";
        img.className = "reina-img";

        // Agregar la imagen a la celda
        celda.appendChild(img);
        reinasColocadas++;
        // Actualizar el número de reinas restantes
        actualizarReinasRestantes();
      } else {
        alert("Ya se colocaron las 8 reinas.");
      }
    }
  }
}

function hayReinaEnFilaColumnaDiagonal(fila, columna) {
  // Verificar en la misma fila y columna
  for (var i = 0; i < 8; i++) {
    if (i !== fila) {
      var celdaFila = document.getElementById("tablero").rows[i].cells[columna];
      if (celdaFila.querySelector(".reina-img")) {
        return true;
      }
    }

    if (i !== columna) {
      var celdaColumna = document.getElementById("tablero").rows[fila].cells[i];
      if (celdaColumna.querySelector(".reina-img")) {
        return true;
      }
    }

    // Verificar en diagonales
    var dif = Math.abs(fila - i);
    if (columna - dif >= 0) {
      var celdaDiagonal1 = document.getElementById("tablero").rows[i].cells[columna - dif];
      if (celdaDiagonal1.querySelector(".reina-img")) {
        return true;
      }
    }

    if (columna + dif < 8) {
      var celdaDiagonal2 = document.getElementById("tablero").rows[i].cells[columna + dif];
      if (celdaDiagonal2.querySelector(".reina-img")) {
        return true;
      }
    }
  }

  return false;
}

function actualizarReinasRestantes() {
  var reinasRestantes = 8 - reinasColocadas;
  document.getElementById("reinasRestantes").textContent = "Reinas restantes: " + reinasRestantes;
}

function resetearTablero() {
  var table = document.getElementById("tablero");

  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[0].cells.length; j++) {

      var celda = document.getElementById("tablero").rows[i].cells[j];
      var reinaExistente = celda.querySelector(".reina-img");
      if (reinaExistente) {
        reinaExistente.remove();
      }
    }
  }
  reinasColocadas = 0;
  actualizarReinasRestantes();
}
