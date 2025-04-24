let currentPage = 1;

async function loadHolidays(page) {
  const res = await fetch(`/holiday/search?page=${page}`);
  const data = await res.json();

  let table = `
    <table class="min-w-full divide-y divide-gray-400">
      <thead class="bg-neutral-800 text-white text-left text-lg">
        <tr>
          <th class="px-6 py-4">Holidays</th>
          <th class="px-6 py-4">Date</th>
          <th class = "px-6 py-4"> Check One </th>
        </tr>
      </thead>
      <tbody class="text-gray-200 bg-neutral-800">
  `;

  if (data.length === 0) {
    table += `<tr><td colspan="2" class="text-center py-6">There´s no more holidays</td></tr>`;
  } else {
    data.forEach((holiday) => {
      table += `
        <tr class="hover:bg-neutral-700 border-b border-gray-600">
          <td class="px-6 py-4">${holiday.nombre}</td>
          <td class="px-6 py-4">${new Date(holiday.fecha).toLocaleDateString(
            "es-MX",
            { weekday: "long", year: "numeric", month: "long", day: "numeric" }
          )}</td>
          <td class="px-4 py-2">
            <a href="/holiday/check/${holiday.usedHolidayID}" class="btnPrimary">Check</a>
          </td>
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
