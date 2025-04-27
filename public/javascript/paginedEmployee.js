let currentPage = 1;
let currentQuery = "";
let filter = "all";

function updateEmployeeCount(visibleCount, totalCount) {
    const countSpan = document.getElementById("employeeCount");
    countSpan.textContent = `${totalCount}`;
}

async function loadEmployees(page, query = "", selectedFilter = filter) {
    const url = `/employee/search?page=${page}&query=${encodeURIComponent(
        query
    )}&filter=${selectedFilter}`;

    const res = await fetch(url);
    const data = await res.json();
    const employees = data.employees || [];
    const totalCount = data.totalCount || employees.length;

    updateEmployeeCount(employees.length, totalCount);

    let table = `<table class="tContainer">
        <thead class="tHead">
            <tr>
                <th class="hRow">Full Name</th>
                <th class="hRow">Department</th>
                <th class="hRow">Role</th>
                <th class="hRow">View</th>
            </tr>
        </thead>
        <tbody class="tBody">`;

    if (employees.length === 0) {
        table += `<tr><td colspan="4" class="dataless">No employees found</td></tr>`;
    } else {
        employees.forEach((emp) => {
            table += `<tr class="tRow">
                <td class="tContent">${emp.birthName} ${
                emp.surname
            }</td>
                <td class="tContent">${
                    emp.departmentName || "N/A"
                } - ${emp.enterpriseName}</td>
                <td class="tContent">${emp.roleName || "N/A"}</td>
                <td class="tContent">
                    <a href="/employee/${
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
    document.getElementById("nextPage").disabled = employees.length < 1;
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
