document.addEventListener("DOMContentLoaded", () => {
    const holidaySelect = document.getElementById("usedTemplateHolidayIDFK");
    const dateInput = document.getElementById("usedDate");

    holidaySelect.addEventListener("change", () => {
        const selectedOption =
            holidaySelect.options[holidaySelect.selectedIndex];
        const dateValue = selectedOption.getAttribute("data-date");
        if (dateValue) {
            dateInput.value = dateValue;
        }
    });
});
