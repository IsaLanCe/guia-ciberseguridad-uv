"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // Seleccionar elementos del menú lateral
  const menuLateral = document.querySelector(".menu-lateral");
  const botonMenu = document.querySelector(".menu-toggle");

  // Verificar que los elementos existan
  if (!menuLateral || !botonMenu) {
    return;
  }

  // Abrir y cerrar el menú en dispositivos móviles
  botonMenu.addEventListener("click", () => {

    const estaAbierto =
      menuLateral.classList.toggle("menu-abierto");

    // Actualizar el estado accesible del botón
    botonMenu.setAttribute(
      "aria-expanded",
      String(estaAbierto)
    );

  });

});


/* =========================================================
   RESPUESTA A INCIDENTES
   Funcionalidad de las pestañas
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const pestanas = document.querySelectorAll(".pestana-incidente");
  const paneles = document.querySelectorAll(".panel-incidente");

  if (pestanas.length === 0 || paneles.length === 0) {
    return;
  }

  function activarPestana(pestanaSeleccionada) {

    pestanas.forEach(function (pestana) {

      const seleccionada = pestana === pestanaSeleccionada;

      pestana.classList.toggle("activa", seleccionada);
      pestana.setAttribute("aria-selected", seleccionada);
      pestana.setAttribute("tabindex", seleccionada ? "0" : "-1");

    });

    paneles.forEach(function (panel) {

      const mostrar =
        panel.id === pestanaSeleccionada.getAttribute("aria-controls");

      panel.classList.toggle("activo", mostrar);
      panel.hidden = !mostrar;

    });

  }

  // Cambio de pestaña al hacer clic
  pestanas.forEach(function (pestana, indice) {

    pestana.addEventListener("click", function () {
      activarPestana(pestana);
    });

    // Navegación mediante teclado
    pestana.addEventListener("keydown", function (evento) {

      let nuevoIndice = indice;

      switch (evento.key) {

        case "ArrowRight":
          nuevoIndice = (indice + 1) % pestanas.length;
          break;

        case "ArrowLeft":
          nuevoIndice = (indice - 1 + pestanas.length) % pestanas.length;
          break;

        case "Home":
          nuevoIndice = 0;
          break;

        case "End":
          nuevoIndice = pestanas.length - 1;
          break;

        default:
          return;

      }

      evento.preventDefault();

      pestanas[nuevoIndice].focus();
      activarPestana(pestanas[nuevoIndice]);

    });

  });

});
