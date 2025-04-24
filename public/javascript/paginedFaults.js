let currentPage = 1;
  
    /**
     * Carga las faltas administrativas según la página, el texto de búsqueda y el filtro.
     * @param {number} page - Número de la página a cargar.
     * @param {string} query - Texto de búsqueda ingresado.
     * @param {string} selectedFilter - Filtro seleccionado en el <select>.
     */
    async function loadFaltas(page, query = "", selectedFilter = "all") {
      // Ajusta la ruta según tu lógica de backend
      const url = `/fault/search?page=${page}&query=${encodeURIComponent(query)}&filter=${selectedFilter}`;
      const res = await fetch(url);
      const data = await res.json();
  
      // Construimos la tabla con el mismo estilo que "List of all Employees"
      let table = `
        <table class="w-full divide-y divide-neutral-200 text-center">
          <thead class="bg-neutral-800/50">
            <tr>
              <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">E-mail</th>
              <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Date of the Fault</th>
              <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Numbers of Faults</th>
              <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Access the fault</th>
            </tr>
          </thead>
          <tbody class="bg-neutral-800 divide-y divide-neutral-200">
      `;
  
      if (!data || data.faults.length === 0) {
        table += `
          <tr>
            <td colspan="4" class="px-6 py-4 text-white text-center">There´s no more faults.</td>
          </tr>
        `;
      } else {
        data.faults.forEach((falta) => {
          table += `
            <tr>
              <td class="px-6 py-4 text-white">${falta.nombre}</td>
              <td class="px-6 py-4 text-white">${falta.correo}</td>
              <td class="px-6 py-4 text-white">
                ${new Date(falta.fecha_falta).toLocaleDateString("es-MX")}
              </td>
              <td class="px-6 py-4 text-white font-semibold">${falta.num_faltas}</td>
              <td class="px-6 py-4 text-white"><a href="/employee/${falta.faultUserIDFK}/faults" class="btnPrimary">Check</a></td>
            </tr>
          `;
        });
      }
  
      table += `</tbody></table>`;
      document.getElementById("faltasTable").innerHTML = table;
  
      // Control de botones "Anterior" y "Siguiente"
      document.getElementById("prevBtn").disabled = page === 1;
      // Ajusta este límite (6) según tu backend (cuántos registros se devuelven por página)
      document.getElementById("nextBtn").disabled = !data || data.faults.length < 6;
    }
  
    // Carga inicial
    document.addEventListener("DOMContentLoaded", () => {
      loadFaltas(currentPage);
    });
  
    // Evento para botón "Anterior"
    document.getElementById("prevBtn").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        loadFaltas(
          currentPage,
          document.getElementById("search").value,
          document.getElementById("filterSelect").value
        );
      }
    });
  
    // Evento para botón "Siguiente"
    document.getElementById("nextBtn").addEventListener("click", () => {
      currentPage++;
      loadFaltas(
        currentPage,
        document.getElementById("search").value,
        document.getElementById("filterSelect").value
      );
    });
  
    // Evento para búsqueda
    document.getElementById("search").addEventListener("input", (event) => {
      currentPage = 1;
      loadFaltas(
        currentPage,
        event.target.value,
        document.getElementById("filterSelect").value
      );
    });
  

    // Evento para filtro
    document.getElementById("filterSelect").addEventListener("change", (event) => {
      currentPage = 1;
      loadFaltas(
        currentPage,
        document.getElementById("search").value,
        event.target.value
      );
    });