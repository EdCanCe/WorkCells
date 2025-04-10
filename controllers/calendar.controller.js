const Vacation = require('../models/vacation.model');
const Absence = require('../models/absence.model');
const OneToOne = require('../models/oneToOne.model');
const Holiday = require('../models/holiday.model');
const formatDate = require('../util/formatDate');
const sessionVars = require('../util/sessionVars');

exports.getRoot = (request, response, next) => {

    // Obtiene los días de inicio y final de la semana
    const getWeekDays = (date) => {
        // Obtiene el día de la semana
        const dayOfWeek = date.getDay(); 

        // Obtiene el primer día de la semana
        let startingDate = new Date(date);
        startingDate.setDate(date.getDate() - dayOfWeek);

        // Obtiene el último día de la semana
        let endingDate = new Date(startingDate);
        endingDate.setDate(startingDate.getDate() + 6);

        return {
            startingDate,
            endingDate,
        }
    }

    // Lee la cookie y la pone en una variable
    let isMonthView = (request.cookies.isMonthView === '1') ? true : false; // Convertir a booleano con '1' o '0'

    // Configura la cookie con valores consistentes
    response.cookie('isMonthView', isMonthView ? '1' : '0', {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    });

    // Obtiene la fecha actual
    const today = new Date();
    let startDate, endDate;

    // Vista mensual
    if (isMonthView) { 
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Vista semanal: lunes a domingo de la semana actual
    } else { 
        const weekDays = getWeekDays(today);
        startDate = weekDays.startingDate;
        endDate = weekDays.endingDate;
    }

    // Obtiene las fechas límite que usará para renderizar el calendario 
    let preSqlStartDate = startDate;
    let preSqlEndDate = endDate
    if (isMonthView) {
        preSqlStartDate = getWeekDays(startDate).startingDate;
        preSqlEndDate = getWeekDays(endDate).endingDate;
    }

    preSqlStartDate = new Date(preSqlStartDate);
    preSqlEndDate = new Date(preSqlEndDate);

    // Obtiene las fechas en formato SQL para hacer queries
    const sqlStartDate = formatDate.forSql(preSqlStartDate);
    const sqlEndDate = formatDate.forSql(preSqlEndDate);

    console.log('Start, End, preStart, endStart: ');
    console.log(startDate, endDate);

    //console.log(preSqlStartDate, preSqlEndDate);
    console.log(sqlStartDate, sqlEndDate);

    response.render('calendar', {
        ...sessionVars(request),
        isMonthView,
        today: formatDate.forSql(today),
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });

};

exports.getFetch = (request, response, next) => {

    // Obtiene los días de inicio y final de la semana
    const getWeekDays = (date) => {
        // Obtiene el día de la semana
        const dayOfWeek = date.getDay();

        // Obtiene el primer día de la semana
        let startingDate = new Date(date);
        startingDate.setDate(date.getDate() - dayOfWeek);

        // Obtiene el último día de la semana
        let endingDate = new Date(startingDate);
        endingDate.setDate(startingDate.getDate() + 6);

        return {
            startingDate,
            endingDate,
        }
    }

    // Lee la cookie y la pone en una variable
    let isMonthView = (request.cookies.isMonthView === '1') ? true : false; // Convertir a booleano con '1' o '0'

    // Configura la cookie con valores consistentes
    response.cookie('isMonthView', isMonthView ? '1' : '0', {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    });

    // Obtiene la fecha actual
    const today = new Date(request.params.date);
    console.log(today);
    let startDate, endDate;

    // Vista mensual
    if (isMonthView) { 
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Vista semanal: lunes a domingo de la semana actual
    } else { 
        const weekDays = getWeekDays(today);
        startDate = weekDays.startingDate;
        endDate = weekDays.endingDate;
    }

    // Obtiene las fechas límite que usará para renderizar el calendario 
    let preSqlStartDate = startDate;
    let preSqlEndDate = endDate
    if (isMonthView) {
        preSqlStartDate = getWeekDays(startDate).startingDate;
        preSqlEndDate = getWeekDays(endDate).endingDate;
    }

    preSqlStartDate = new Date(preSqlStartDate);
    preSqlEndDate = new Date(preSqlEndDate);

    // Obtiene las fechas en formato SQL para hacer queries
    const sqlStartDate = formatDate.forSql(preSqlStartDate);
    const sqlEndDate = formatDate.forSql(preSqlEndDate);

    console.log('Start, End, preStart, endStart: ');
    console.log(startDate, endDate);

    //console.log(preSqlStartDate, preSqlEndDate);
    console.log(sqlStartDate, sqlEndDate);
    console.log('Intento id?', request.session.userID);

    Holiday.fetchByDateType(sqlStartDate, sqlEndDate)
        .then(([rows, fieldData]) => {
            const holidayRows = rows;
            Vacation.fetchByDateType(sqlStartDate, sqlEndDate, request.session.userID)
                .then(([rows, fieldData]) => {
                    const vacationRows = rows;
                    Absence.fetchByDateType(sqlStartDate, sqlEndDate, request.session.userID)
                        .then(([rows, fieldData]) => {
                            const absenceRows = rows;

                            const oneToOneFetch = (request.session.role == 'Human Resources') ?
                            OneToOne.fetchByDateTypeHR(sqlStartDate, sqlEndDate) :
                            OneToOne.fetchByDateType(sqlStartDate, sqlEndDate, request.session.userID);
                            
                            oneToOneFetch
                                .then(([rows, fieldData]) => {
                                    const oneToOneRows = rows;

                                    // Lógica para hacer el arreglo a renderizar

                                    // Usamos Map para acceso rápido por fecha
                                    const daysMap = new Map(); 

                                    // Índice para recorrer cada uno de los días
                                    const currentDate = new Date(preSqlStartDate);

                                    // Genera un arreglo vacío para los eventos de cada día
                                    while (currentDate <= preSqlEndDate) {
                                        const dateStr = formatDate.forSql(currentDate);
                                        daysMap.set(dateStr, { // La llave para los elementos del mapa es la fecha en string
                                            date: new Date(currentDate),
                                            dayNumber: currentDate.getDate(),
                                            events: {
                                                vacations: [],
                                                absences: [],
                                                holidays: [],
                                                oneToOnes: []
                                            },
                                        });
                                        currentDate.setDate(currentDate.getDate() + 1);
                                    }

                                    // Procesar feriados (eventos de un día)
                                    holidayRows.forEach((holiday) => {
                                        const date = new Date(holiday.usedDate);
                                        const day = daysMap.get(formatDate.forSql(date));
                                        if (day) {
                                            day.events.holidays.push(holiday);
                                        }
                                    });

                                    // Procesar on to ones (eventos de un día)
                                    oneToOneRows.forEach((oneToOne) => {
                                        const date = new Date(oneToOne.meetingDate);
                                        const day = daysMap.get(formatDate.forSql(date));
                                        if (day) {
                                            day.events.oneToOnes.push(oneToOne);
                                        }
                                    });

                                    // Procesar vacaciones (eventos de múltiples días)
                                    vacationRows.forEach((vacation) => {
                                        const start = new Date(vacation.startDate);
                                        const end = new Date(vacation.endDate);
                                        const current = new Date(start);

                                        // Por cada día del que la vacación es parte le añade al mapa
                                        while (current <= end) {
                                            const dateStr = formatDate.forSql(current);
                                            const day = daysMap.get(dateStr);
                                            if (day) {
                                                day.events.vacations.push({
                                                    ...vacation,
                                                    isStart: dateStr === formatDate.forSql(vacation.startDate),
                                                    isEnd: dateStr === formatDate.forSql(vacation.endDate)
                                                });
                                            }
                                            current.setDate(current.getDate() + 1);
                                        }
                                    });

                                    // Procesar ausencias (eventos de múltiples días)
                                    absenceRows.forEach((absence) => {
                                        const start = new Date(absence.startDate);
                                        const end = new Date(absence.endDate);
                                        const current = new Date(start);

                                        // Por cada día del que la ausencia es parte le añade al mapa
                                        while (current <= end) {
                                            const dateStr = formatDate.forSql(current);
                                            const day = daysMap.get(dateStr);
                                            if (day) {
                                                day.events.absences.push({
                                                    ...absence,
                                                    isStart: dateStr === formatDate.forSql(absence.startDate),
                                                    isEnd: dateStr === formatDate.forSql(absence.endDate)
                                                });
                                            }
                                            current.setDate(current.getDate() + 1);
                                        }
                                    });

                                    // Convierte el mapa a array
                                    let daysArray = Array.from(daysMap.values());

                                    // En caso de ser mensual, le dice a los días extras que no son parte del mes
                                    if (isMonthView) {
                                        // Obtener el día de la semana del primer día del mes
                                        const firstDayOfWeek = startDate.getDay();

                                        // Marcar días anteriores al mes como que están fuera
                                        for (let i = 0; i < firstDayOfWeek; i++) {
                                            daysArray[i] = {
                                                ...daysArray[i],
                                                isOutside: true,
                                            };
                                        }

                                        // Obtener el día de la semana del último día del mes
                                        const totalDaysInMonth = endDate.getDate();
                                        const totalCellsNeeded = Math.ceil((totalDaysInMonth + firstDayOfWeek) / 7) * 7;
                                        const daysToAddAtEnd = totalCellsNeeded - (totalDaysInMonth + firstDayOfWeek);

                                        // Marcar días anteriores al mes como que están fuera
                                        for (let i = daysArray.length - daysToAddAtEnd; i < daysArray.length; i++) {
                                            daysArray[i] = {
                                                ...daysArray[i],
                                                isOutside: true,
                                            };
                                        }
                                    }

                                    response.status(200).json({
                                        isMonthView,
                                        today: formatDate.forSql(today),
                                        days: daysArray,
                                        formattedStart: formatDate.withOrdinal(startDate),
                                        formattedEnd: formatDate.withOrdinal(endDate),
                                        formattedMonth: `${startDate.toLocaleString('default', { month: 'long' })}, ${startDate.getFullYear()}`,
                                    });
                                })
                                .catch((error) => {
                                    console.error(error);
                                    response.status(500).send('Error al obtener los datos. 1');
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                            response.status(500).send('Error al obtener los datos. 2');
                        });
                })
                .catch((error) => {
                    console.error(error);
                    response.status(500).send('Error al obtener los datos. 3');
                });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Error al obtener los datos. 4');
        });
}