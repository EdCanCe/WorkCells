let currentPage = 1;

async function loadHolidays(page) {
  const res = await fetch(`/holiday/search?page=${page}`);
  const data = await res.json();

  let table = `
    <table class="min-w-full divide-y divide-emerald-200">
      <thead class="bg-neutral-800 text-white text-left text-lg">
        <tr>
          <th class="px-6 py-4">Día Feriado</th>
          <th class="px-6 py-4">Fecha</th>
        </tr>
      </thead>
      <tbody class="text-gray-200 bg-neutral-800">
  `;

  if (data.length === 0) {
    table += `<tr><td colspan="2" class="text-center py-6">No hay más registros.</td></tr>`;
  } else {
    data.forEach((holiday) => {
      table += `
        <tr class="hover:bg-neutral-700 border-b border-gray-600">
          <td class="px-6 py-4">${holiday.nombre}</td>
          <td class="px-6 py-4">${new Date(holiday.fecha).toLocaleDateString(
        "es-MX",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      )}</td>
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
