let currentPage = 1;
let currentQuery = "";
let filter = "all";

async function loadEmployees(page, query = "", selectedFilter = filter) {
    const url = `/employee/search?page=${page}&query=${encodeURIComponent(
        query
    )}&filter=${selectedFilter}`;

    const res = await fetch(url);
    const data = await res.json();
    const employees = data.employees || [];

    let table = `<table class="w-full divide-y divide-neutral-200 text-center">
        <thead class="bg-neutral-800/50">
            <tr>
                <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Full Name</th>
                <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">View</th>
            </tr>
        </thead>
        <tbody class="bg-neutral-800 divide-y divide-neutral-200">`;

    if (employees.length === 0) {
        table += `<tr><td colspan="4" class="px-6 py-4 text-white text-center">No employees found</td></tr>`;
    } else {
        employees.forEach((emp) => {
            table += `<tr>
                <td class="px-6 py-4 text-white">${emp.birthName} ${
                emp.surname
            }</td>
                <td class="px-6 py-4 text-white">${
                    emp.departmentName || "N/A"
                } - ${emp.enterpriseName}</td>
                <td class="px-6 py-4 text-white">${emp.roleName || "N/A"}</td>
                <td class="px-6 py-4 text-white">
                    <a href="/employee/check?id=${
                        emp.userID
                    }" class="btnPrimary ml-2">Check</a>
                </td>
            </tr>`;
        });

        document
            .getElementById("employeeTable")
            .scrollIntoView({ behavior: "smooth" });
    }

    table += `</tbody></table>`;
    document.getElementById("employeeTable").innerHTML = table;

    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = employees.length < 6;
}

document.addEventListener("DOMContentLoaded", () => {
    loadEmployees(currentPage, currentQuery, filter);
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadEmployees(currentPage, currentQuery, filter);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    loadEmployees(currentPage, currentQuery, filter);
});

document.getElementById("search").addEventListener("input", async (event) => {
    currentQuery = event.target.value;
    currentPage = 1;
    loadEmployees(currentPage, currentQuery, filter);
});

document.getElementById("filterSelect").addEventListener("change", (event) => {
    filter = event.target.value;
    currentPage = 1;
    loadEmployees(currentPage, currentQuery, filter);
});
