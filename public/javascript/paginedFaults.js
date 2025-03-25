let currentPage = 1;

async function loadFaltas(page) {
  const res = await fetch(`/fault/search?page=${page}`);
  const data = await res.json();

  let table = `
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-100 text-gray-700 text-left text-lg">
        <tr>
          <th class="px-6 py-4">Nombre</th>
          <th class="px-6 py-4">Correo</th>
          <th class="px-6 py-4">Fecha de la Falta</th>
          <th class="px-6 py-4">Número de Faltas</th>
        </tr>
      </thead>
      <tbody class="text-gray-800">
  `;

  if (data.length === 0) {
    table += `<tr><td colspan="4" class="text-center py-6">No hay más registros.</td></tr>`;
  } else {
    data.forEach((falta) => {
      table += `
        <tr class="hover:bg-gray-50 border-b">
          <td class="px-6 py-4">${falta.nombre}</td>
          <td class="px-6 py-4">${falta.correo}</td>
          <td class="px-6 py-4">${new Date(
            falta.fecha_falta
          ).toLocaleDateString("es-MX")}</td>
          <td class="px-6 py-4 font-semibold">${falta.num_faltas}</td>
        </tr>
      `;
    });
  }

  table += `</tbody></table>`;
  document.getElementById("faltasTable").innerHTML = table;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  loadFaltas(currentPage);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadFaltas(currentPage);
  }
});

// Carga inicial
loadFaltas(currentPage);
