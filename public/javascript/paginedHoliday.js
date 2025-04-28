let currentPage = 1;

async function loadHolidays(page) {
  const res = await fetch(`/holiday/search?page=${page}`);
  const data = await res.json();

  let table = `
    <table class="tContainer">
      <thead class="tHead">
        <tr>
          <th class="hRow">Holidays</th>
          <th class="hRow">Date</th>
          <th class="hRow">View One</th>
        </tr>
      </thead>
      <tbody class="tBody">
  `;

  if (data.length === 0) {
    table += `<tr><td colspan="3" class="dataless">There´s no more holidays</td></tr>`;
  } else {
    data.forEach((holiday) => {
      table += `
        <tr class="tRow">
          <td class="tContent">${holiday.nombre}</td>
          <td class="tContent">${new Date(holiday.fecha).toLocaleDateString(
            "es-MX",
            { weekday: "long", year: "numeric", month: "long", day: "numeric" }
          )}</td>
          <td class="tContent">
            <a href="/holiday/check/${holiday.usedHolidayID}" class="btnPrimary">View</a>
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
