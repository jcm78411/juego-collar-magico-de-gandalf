    // Variables del juego
    let perlas = [], iniciado = false, presionado = false;
    let intervaloAuto = null, intervaloManual = null;
    let contadorToques = 0;

    // Referencias a los elementos del DOM
    const collar = document.getElementById("collar");
    const iniciarBtn = document.getElementById("iniciar");
    const detenerBtn = document.getElementById("detener");
    const cantidadInput = document.getElementById("cantidad");
    const blancasInput = document.getElementById("blancas");
    const avanceInput = document.getElementById("avance");
    const colorPickerNegra = document.getElementById("colorPickerNegra");
    const colorPickerBlanca = document.getElementById("colorPickerBlanca");
    const autoCheckbox = document.getElementById("autoCheckbox");
    const velocidadInput = document.getElementById("velocidad");
    const contadorSpan = document.getElementById("contador");

    // Muestra las reglas del juego al cargar la página
    window.onload = () => {
      Swal.fire({
        title: 'Reglas del Juego',
        html: `<p><strong>Objetivo:</strong> Lograr que todas las perlas del collar se vuelvan blancas.<br><br>
        - Hay n perlas, todas negras salvo las indicadas como blancas.<br>
        - Cada vez que haces clic, todas las perlas se mueven una posición a la izquierda.<br>
        - Si la perla que llega a la posición 1 es blanca, la última se vuelve blanca automáticamente.<br><br>
        <strong>Estrategia:</strong><br>
        Cada vez que una blanca llega a la posición 1, crea otra blanca. El blanco se propaga.<br><br>
        <em>¡Logra que todas sean blancas!</em></p>`,
        icon: 'info',
        confirmButtonText: '¡Jugar!'
      });
    };

    // Evento para iniciar el juego
    iniciarBtn.addEventListener("click", () => {
      const n = parseInt(cantidadInput.value);
      const blancasStr = blancasInput.value.trim();
      const posicionesBlancas = blancasStr ? blancasStr.split(',').map(x => parseInt(x.trim()) - 1).filter(x => x >= 0 && x < n) : [];

      if (n < 2 || n > 10000) {
        Swal.fire("Error", "Cantidad inválida de perlas.", "error");
        return;
      }

      // Inicializa el juego
      iniciado = true;
      iniciarBtn.disabled = true;
      detenerBtn.disabled = false;
      cantidadInput.disabled = true;
      blancasInput.disabled = true;
      avanceInput.disabled = false;

      // Crea el arreglo de perlas
      perlas = Array(n).fill("negra");
      posicionesBlancas.forEach(pos => perlas[pos] = "blanca");
      contadorToques = 0;
      actualizarContador();
      renderCollar();

      // NUEVO: empezar movimiento si está en automático
      const pasos = parseInt(avanceInput.value) || 1;
      if (autoCheckbox.checked) {
        const velocidad = parseInt(velocidadInput.value) || 200;
        intervaloAuto = setInterval(() => avanzarCollar(pasos), velocidad);
      }
    });

    // Botón para recargar la página y reiniciar el juego
    detenerBtn.addEventListener("click", () => location.reload());

    // Función para avanzar el collar
    function avanzarCollar(pasos) {
      const maxToques = (perlas.length - 1) ** 2;

      // Verifica si se alcanzó el máximo de toques
      if (contadorToques + pasos > maxToques) {
        Swal.fire("Límite alcanzado", `Máximo de ${maxToques} toques permitidos.`, "warning");
        clearInterval(intervaloAuto);
        clearInterval(intervaloManual);
        iniciado = false;
        return;
      }

      // Mueve las perlas "pasos" veces
      for (let i = 0; i < pasos; i++) {
        const primera = perlas.shift();
        perlas.push(primera);
        if (perlas[0] === "blanca") perlas[perlas.length - 1] = "blanca";
      }

      contadorToques += pasos;
      actualizarContador();
      renderCollar();

      // Verifica condiciones de victoria o derrota
      if (perlas.every(p => p === "blanca")) {
        iniciado = false;
        clearInterval(intervaloAuto);
        clearInterval(intervaloManual);
        Swal.fire("¡Éxito!", "¡Todas las perlas son blancas!", "success");
        return;
      }

      if (contadorToques === maxToques && !perlas.every(p => p === "blanca")) {
        iniciado = false;
        clearInterval(intervaloAuto);
        clearInterval(intervaloManual);
        Swal.fire("Fin del juego", "Se alcanzó el número máximo de toques y no todas las perlas son blancas.", "error");
      }
    }

    // Renderiza el collar visualmente
    function renderCollar() {
      collar.innerHTML = "";
      perlas.forEach((color, i) => {
        const p = document.createElement("div");
        p.className = "perla";
        if (i === 0) p.classList.add("transform");
        p.style.backgroundColor = color === "blanca" ? colorPickerBlanca.value : colorPickerNegra.value;
        p.style.border="2px solid #ccc";
        collar.appendChild(p);
      });
    }

    // Actualiza el contador visual
    function actualizarContador() {
      contadorSpan.textContent = contadorToques;
    }

    // Evento para mantener presionado el mouse y avanzar
    document.addEventListener("mousedown", e => {
      if (!iniciado || autoCheckbox.checked || e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
      presionado = true;
      const pasos = parseInt(avanceInput.value) || 1;
      avanzarCollar(pasos);
      setTimeout(() => {
        if (presionado) {
          intervaloManual = setInterval(() => {
            if (presionado) avanzarCollar(pasos);
          }, 100);
        }
      }, 300);
    });

    // Detiene el avance al soltar el mouse o salir de la ventana
    document.addEventListener("mouseup", () => {
      presionado = false;
      clearInterval(intervaloManual);
    });

    document.addEventListener("mouseleave", () => {
      presionado = false;
      clearInterval(intervaloManual);
    });

    // Control de modo automático (avanza solo)
    autoCheckbox.addEventListener("change", () => {
      clearInterval(intervaloAuto);
      if (autoCheckbox.checked && iniciado) {
        const pasos = parseInt(avanceInput.value) || 1;
        const velocidad = parseInt(velocidadInput.value) || 200;
        intervaloAuto = setInterval(() => avanzarCollar(pasos), velocidad);
      }
    });