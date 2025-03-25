const Vacation = require("../models/vacation.model");
const Absence = require("../models/absence.model");
const OneToOne = require("../models/oneToOne.model");
const Holiday = require("../models/holiday.model");

exports.getRoot = (req, res, next) => {
    // 1. Leer la cookie correctamente (convertir a booleano)
    let isMonthView = (req.cookies.isMonthView === '1') ? true : false; // Convertir a booleano con '1' o '0'

    // 2. Configurar la cookie con valores consistentes
    res.cookie("isMonthView", isMonthView ? '1' : '0', {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    });

    // Obtener fecha actual y calcular rangos
    const today = new Date();
    let startDate, endDate;

    if (isMonthView) {
        // Vista mensual: primer y último día del mes actual
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else {
        // Vista semanal: lunes a domingo de la semana actual
        const dayOfWeek = today.getDay();
        const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Ajuste para domingo

        startDate = new Date(today);
        startDate.setDate(today.getDate() - diffToMonday);

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
    }

    // Formatear fechas para SQL (YYYY-MM-DD)
    const formatDateForSQL = (date) => {
        return date.toISOString().split("T")[0];
    };

    const sqlStartDate = formatDateForSQL(startDate);
    const sqlEndDate = formatDateForSQL(endDate);

    let holidayRows;
    let absenceRows;
    let vacationRows;
    let oneToOneRows;

    Holiday.fetchByDateType(sqlStartDate, sqlEndDate)
        .then(([rows, fieldData]) => {
            holidayRows = rows;
            Vacation.fetchByDateType(sqlStartDate, sqlEndDate, req.session.userID)
                .then(([rows, fieldData]) => {
                    vacationRows = rows;
                    Absence.fetchByDateType(sqlStartDate, sqlEndDate, req.session.userID)
                        .then(([rows, fieldData]) => {
                            absenceRows = rows;
                            OneToOne.fetchByDateType(
                                sqlStartDate,
                                sqlEndDate,
                                req.session.userID
                            )
                                .then(([rows, fieldData]) => {
                                    oneToOneRows = rows;

                                    console.log(holidayRows);
                                    console.log(vacationRows);
                                    console.log(absenceRows);
                                    console.log(oneToOneRows);

                                    const daysMap = new Map(); // Usamos Map para acceso rápido por fecha
                                    const currentDate = new Date(startDate);

                                    while (currentDate <= endDate) {
                                        const dateStr = currentDate.toISOString().split('T')[0];
                                        daysMap.set(dateStr, {
                                            date: new Date(currentDate),
                                            dateString: dateStr,
                                            dayNumber: currentDate.getDate(),
                                            events: {
                                                vacations: [],
                                                absences: [],
                                                holidays: [],
                                                oneToOnes: []
                                            },
                                            isEmpty: false
                                        });
                                        currentDate.setDate(currentDate.getDate() + 1);
                                    }

                                    // 5.1 Procesar feriados (eventos de un día)
                                    holidayRows.forEach(holiday => {
                                        const date = new Date(holiday.usedDate);
                                        const day = daysMap.get(date.toISOString().split('T')[0]);
                                        if (day) {
                                            day.events.holidays.push(holiday);
                                        }
                                    });

                                    // 5.2 Procesar one-to-ones (eventos de un día)
                                    oneToOneRows.forEach(oneToOne => {
                                        const date = new Date(oneToOne.meetingDate);
                                        const day = daysMap.get(date.toISOString().split('T')[0]);
                                        if (day) {
                                            day.events.oneToOnes.push(oneToOne);
                                        }
                                    });

                                    // 5.3 Procesar vacaciones (eventos de múltiples días)
                                    vacationRows.forEach(vacation => {
                                        const start = new Date(vacation.startDate);
                                        const end = new Date(vacation.endDate);
                                        const current = new Date(start);

                                        while (current <= end) {
                                            const dateStr = current.toISOString().split('T')[0];
                                            const day = daysMap.get(dateStr);
                                            if (day) {
                                                day.events.vacations.push({
                                                    ...vacation,
                                                    isStart: dateStr === vacation.startDate,
                                                    isEnd: dateStr === vacation.endDate
                                                });
                                            }
                                            current.setDate(current.getDate() + 1);
                                        }
                                    });

                                    // 5.4 Procesar ausencias (eventos de múltiples días)
                                    absenceRows.forEach(absence => {
                                        const start = new Date(absence.startDate);
                                        const end = new Date(absence.endDate);
                                        const current = new Date(start);

                                        while (current <= end) {
                                            const dateStr = current.toISOString().split('T')[0];
                                            const day = daysMap.get(dateStr);
                                            if (day) {
                                                day.events.absences.push({
                                                    ...absence,
                                                    isStart: dateStr === absence.startDate,
                                                    isEnd: dateStr === absence.endDate
                                                });
                                            }
                                            current.setDate(current.getDate() + 1);
                                        }
                                    });

                                    // 6. Convertir a array y añadir días vacíos para alineación
                                    let daysArray = Array.from(daysMap.values());

                                    if (isMonthView) {
                                        const firstDayOfWeek = startDate.getDay();
                                        const emptyDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
                                        for (let i = 0; i < emptyDays; i++) {
                                            daysArray.unshift({ isEmpty: true });
                                        }
                                    }

                                    console.log(daysArray);

                                    res.render("calendar", {
                                        isMonthView,
                                        days: daysArray,
                                        weekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                                        startDate,
                                        endDate
                                    });
                                })
                                .catch((error) => {
                                    console.error(error); // Mejor manejo de error
                                    res.status(500).send("Error al obtener los datos. 1");
                                });
                        })
                        .catch((error) => {
                            console.error(error); // Mejor manejo de error
                            res.status(500).send("Error al obtener los datos. 2");
                        });
                })
                .catch((error) => {
                    console.error(error); // Mejor manejo de error
                    res.status(500).send("Error al obtener los datos. 3");
                });
        })
        .catch((error) => {
            console.error(error); // Mejor manejo de error
            res.status(500).send("Error al obtener los datos. 4");
        });
};
