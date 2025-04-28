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
        <table class="tContainer">
          <thead class="tHead">
            <tr>
              <th class="hRow">Name</th>
              <th class="hRow">E-mail</th>
              <th class="hRow">Date of the Fault</th>
              <th class="hRow">Numbers of Faults</th>
              <th class="hRow">View the fault</th>
            </tr>
          </thead>
          <tbody class="tBody">
      `;
  
      if (!data || data.faults.length === 0) {
        table += `
          <tr>
            <td colspan="5" class="dataless">There´s no more faults.</td>
          </tr>
        `;
      } else {
        data.faults.forEach((falta) => {
          table += `
            <tr class="tRow">
              <td class="tContent">${falta.nombre}</td>
              <td class="tContent">${falta.correo}</td>
              <td class="tContent">
                ${new Date(falta.fecha_falta).toLocaleDateString("es-MX")}
              </td>
              <td class="tContent">${falta.num_faltas}</td>
              <td class="tContent"><a href="/employee/${falta.faultUserIDFK}/faults" class="btnPrimary">View</a></td>
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