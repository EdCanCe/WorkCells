const periodSelect = document.getElementById("periodSelect");
const startDateInput = document.getElementById("startDateInput");
const endDateInput = document.getElementById("endDateInput");
const hideExtra = document.getElementById("hideExtra");

periodSelect.addEventListener("change", () => {
    // Cambiar formato a ISO
    const convertToISODate = (dateStr) => {
        const [year, month, day] = dateStr.split('/');

        // En caso de no tener 2 dígitos, ponerlo. Ej 9 -> 09
        const paddedMonth = month.padStart(2, '0');
        const paddedDay = day.padStart(2, '0');
        return `${year}-${paddedMonth}-${paddedDay}`;
    };

    const startDateISO = convertToISODate(periodSelect.value);

    // Calcular fecha final (sumar 1 año)
    const [year, month, day] = periodSelect.value.split('/');
    const endDateISO = convertToISODate(`${parseInt(year) + 1}/${month}/${day}`);

    startDateInput.min = startDateISO;
    startDateInput.max = endDateISO;
    endDateInput.min = startDateISO;
    endDateInput.max = endDateISO;

    hideExtra.classList.remove("hidden");
});