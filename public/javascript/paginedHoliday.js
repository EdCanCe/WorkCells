let currentPage = 1;

async function loadHolidays(page) {
  const res = await fetch(`/holiday/search?page=${page}`);
  const data = await res.json();

  let table = `
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-100 text-gray-700 text-left text-lg">
        <tr>
          <th class="px-6 py-4">Día Feriado</th>
          <th class="px-6 py-4">Fecha</th>
        </tr>
      </thead>
      <tbody class="text-gray-800">
  `;

  if (data.length === 0) {
    table += `<tr><td colspan="2" class="text-center py-6">No hay más registros.</td></tr>`;
  } else {
    data.forEach((holiday) => {
      table += `
        <tr class="hover:bg-gray-50 border-b">
          <td class="px-6 py-4">${holiday.nombre}</td>
          <td class="px-6 py-4">${new Date(
            holiday.fecha
          ).toLocaleDateString("es-MX", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
        </tr>
      `;
    });
  }

  table += `</tbody></table>`;
  document.getElementById("holidaysTable").innerHTML = table;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  loadHolidays(currentPage);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadHolidays(currentPage);
  }
});

// Carga inicial
loadHolidays(currentPage);
