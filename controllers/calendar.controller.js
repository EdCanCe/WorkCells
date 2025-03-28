const Vacation = require("../models/vacation.model");
const Absence = require("../models/absence.model");
const OneToOne = require("../models/oneToOne.model");
const Holiday = require("../models/holiday.model");
const { end } = require("../util/database");

exports.getRoot = (request, response, next) => {

    // Formatea las fechas para ser usadas en SQL
    const formatDateForSQL = (date) => {
        return date.toISOString().split("T")[0];
    };

    // Obtiene los días de inicio y final de la semana
    const getWeekDays = (date) => {
        const dayOfWeek = date.getDay(); // Obtiene el día de la semana

        let startingDate = new Date(date);
        startingDate.setDate(date.getDate() - dayOfWeek); // Obtiene el primer día de la semana

        let endingDate = new Date(startingDate);
        endingDate.setDate(startingDate.getDate() + 6); // Obtiene el último día de la semana

        return {
            startingDate,
            endingDate,
        }
    }

    const mensaje = request.session.info || ""; // Obtén el mensaje de la sesión
    // Limpiar el mensaje después de usarlo
    request.session.info = "";

    // Lee la cookie y la pone en una variable
    let isMonthView = (request.cookies.isMonthView === '1') ? true : false; // Convertir a booleano con '1' o '0'

    // Configura la cookie con valores consistentes
    response.cookie("isMonthView", isMonthView ? '1' : '0', {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    });

    // Obtiene la fecha actual
    const today = new Date();
    let startDate, endDate;

    if (isMonthView) { // Vista mensual
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else { // Vista semanal: lunes a domingo de la semana actual
        const weekDays = getWeekDays(today);
        startDate = weekDays.startingDate;
        endDate = weekDays.endingDate;
    }

    let preSqlStartDate = startDate;
    let preSqlEndDate = endDate
    if(isMonthView) {
        preSqlStartDate = getWeekDays(startDate).startingDate;
        preSqlEndDate = getWeekDays(endDate).endingDate;
    }

    preSqlStartDate = new Date(preSqlStartDate);
    preSqlEndDate = new Date(preSqlEndDate);
    
    // Obtiene las fechas en formato SQL para hacer queries
    const sqlStartDate = formatDateForSQL(preSqlStartDate);
    const sqlEndDate = formatDateForSQL(preSqlEndDate);

    console.log("Start, End, preStart, endStart: ");
    console.log(startDate, endDate);
    //console.log(preSqlStartDate, preSqlEndDate);
    console.log(sqlStartDate, sqlEndDate);

    Holiday.fetchByDateType(sqlStartDate, sqlEndDate)
        .then(([rows, fieldData]) => {
            const holidayRows = rows;
            Vacation.fetchByDateType(sqlStartDate, sqlEndDate, request.session.userID)
                .then(([rows, fieldData]) => {
                    const vacationRows = rows;
                    Absence.fetchByDateType(sqlStartDate, sqlEndDate, request.session.userID)
                        .then(([rows, fieldData]) => {
                            const absenceRows = rows;
                            OneToOne.fetchByDateType(sqlStartDate, sqlEndDate, request.session.userID)
                                .then(([rows, fieldData]) => {
                                    const oneToOneRows = rows;

                                    // Lógica para hacer el arreglo a renderizar

                                    const daysMap = new Map(); // Usamos Map para acceso rápido por fecha
                                    const currentDate = new Date(preSqlStartDate); // Índice para recorrer cada uno de los días

                                    // Genera un arreglo vacío para los eventos de cada día
                                    while (currentDate <= preSqlEndDate) {
                                        const dateStr = formatDateForSQL(currentDate);
                                        daysMap.set(dateStr, { // La llave para los elementos del mapa es la fecha en string
                                            date: new Date(currentDate),
                                            dayNumber: currentDate.getDate(),
                                            events: {
                                                vacations: [],
                                                absences: [],
                                                holidays: [],
                                                oneToOnes: []
                                            },
                                            isEmpty: false // Para saber si es un dato dentro del mes, o únicamente es para completar el grid
                                        });
                                        currentDate.setDate(currentDate.getDate() + 1);
                                    }

                                    // Procesar feriados (eventos de un día)
                                    holidayRows.forEach(holiday => {
                                        const date = new Date(holiday.usedDate);
                                        const day = daysMap.get(formatDateForSQL(date));
                                        if (day) {
                                            day.events.holidays.push(holiday);
                                        }
                                    });

                                    // Procesar on to ones (eventos de un día)
                                    oneToOneRows.forEach(oneToOne => {
                                        const date = new Date(oneToOne.meetingDate);
                                        const day = daysMap.get(formatDateForSQL(date));
                                        if (day) {
                                            day.events.oneToOnes.push(oneToOne);
                                        }
                                    });

                                    // Procesar vacaciones (eventos de múltiples días)
                                    vacationRows.forEach(vacation => {
                                        const start = new Date(vacation.startDate);
                                        const end = new Date(vacation.endDate);
                                        const current = new Date(start);

                                        // Por cada día del que la vacación es parte le añade al mapa
                                        while (current <= end) {
                                            const dateStr = formatDateForSQL(current);
                                            const day = daysMap.get(dateStr);
                                            if (day) {
                                                day.events.vacations.push({
                                                    ...vacation, // Pasa los datos ya existentes
                                                    isStart: dateStr === formatDateForSQL(vacation.startDate),
                                                    isEnd: dateStr === formatDateForSQL(vacation.endDate)
                                                });
                                            }
                                            current.setDate(current.getDate() + 1);
                                        }
                                    });

                                    // Procesar ausencias (eventos de múltiples días)
                                    absenceRows.forEach(absence => {
                                        const start = new Date(absence.startDate);
                                        const end = new Date(absence.endDate);
                                        const current = new Date(start);

                                        // Por cada día del que la ausencia es parte le añade al mapa
                                        while (current <= end) {
                                            const dateStr = formatDateForSQL(current);
                                            const day = daysMap.get(dateStr);
                                            if (day) {
                                                day.events.absences.push({
                                                    ...absence, // Pasa los datos ya existentes
                                                    isStart: dateStr === formatDateForSQL(absence.startDate),
                                                    isEnd: dateStr === formatDateForSQL(absence.endDate)
                                                });
                                            }
                                            current.setDate(current.getDate() + 1);
                                        }
                                    });

                                    // Convierte el mapa a array
                                    let daysArray = Array.from(daysMap.values());

                                    // En caso de ser mensual, le dice a los días extras que no son parte del mes
                                    /*if (isMonthView) {
                                        const firstDayOfMonth = startDate.getDay(); // El día de la semana del 1ro de mes
                                        for (let i = 0; i < firstDayOfMonth; i++) {
                                            //daysArray[i].isOutside = true;
                                            console.log(daysArray[i]);
                                        }
                                        
                                        const lastDayOfMonth = endDate.getDay();
                                        
                                        for (let i = 0; i < 6-lastDayOfMonth; i) {
                                            //daysArray[i].isOutside = true;
                                            console.log(daysArray[i]);
                                        }
                                    }*/

                                    // console.log(daysArray);

                                    response.render("calendar", {
                                        info: mensaje,
                                        isMonthView,
                                        days: daysArray,
                                        weekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                                        startDate,
                                        endDate
                                    });
                                })
                                .catch((error) => {
                                    console.error(error); // Mejor manejo de error
                                    response.status(500).send("Error al obtener los datos. 1");
                                });
                        })
                        .catch((error) => {
                            console.error(error); // Mejor manejo de error
                            response.status(500).send("Error al obtener los datos. 2");
                        });
                })
                .catch((error) => {
                    console.error(error); // Mejor manejo de error
                    response.status(500).send("Error al obtener los datos. 3");
                });
        })
        .catch((error) => {
            console.error(error); // Mejor manejo de error
            response.status(500).send("Error al obtener los datos. 4");
        });
};

exports.getFetch = (request, response, next) => {

}