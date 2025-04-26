const Vacation = require('../models/vacation.model');
const Holiday = require('../models/holiday.model');
const User = require('../models/user.model');
const formatDate = require('../util/formatDate');
const sessionVars = require('../util/sessionVars');
const { sendTemplateMessage } = require('../util/whatsAppMessages');
const title = 'Vacations';


exports.getRequests = (request, response, next) => {
    const userId = request.session.userID;
    const userRole = request.session.role;
    const limit = 10;
    const offset = 0;
    const showAll = request.query.all === 'true';
    let fetchPromise;
    if (userRole === 'Human Resources' || userRole === 'Department Leader') {
        // Usar el método fetchPaginated actualizado que maneja ambos roles
        fetchPromise = Vacation.fetchPaginated(limit, offset, userRole, userId);
    } else {
        // Como fallback, se podrían cargar sólo las solicitudes del usuario o definir otra lógica
        fetchPromise = Vacation.fetchAllVacation(userId);
    }

    fetchPromise
        .then(([rows]) => {
            response.render('vacationRequests', {
                ...sessionVars(request, title),
                vacations: rows,
                role: userRole
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Error al obtener los datos.');
        });
};


exports.getAllRequests = (request, response, next) => {
    const userId = request.session.userID;
    const userRole = request.session.role;
    const limit = 10;
    const offset = 0;
    let fetchPromise;
    if (userRole === 'Human Resources' || userRole === 'Department Leader') {
        // Usar el método fetchPaginated actualizado que maneja ambos roles
        fetchPromise = Vacation.fetchAllPaginated(limit, offset, userRole, userId);
    } else {
        // Como fallback, se podrían cargar sólo las solicitudes del usuario o definir otra lógica
        fetchPromise = Vacation.fetchAllVacation(userId);
    }
    fetchPromise
        .then(([rows]) => {
            response.render('vacationAllRequests', {
                ...sessionVars(request, title),
                vacations: rows,
                role: userRole
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Error al obtener los datos.');
        });
};

exports.getRequestsPaginated = (request, response, next) => {
    const page = parseInt(request.query.page) || 0;
    const limit = 10;
    const offset = page * limit;
    const userId = request.session.userID;
    const userRole = request.session.role;
    const showAll = request.query.all === 'true'; // Nuevo parámetro para mostrar todas las solicitudes
    let fetchPromise;
    if (userRole === 'Human Resources' && showAll) {
        fetchPromise = Vacation.fetchAllPaginated(limit, offset, userRole, userId);
    } 
    else if (userRole === 'Department Leader' && showAll) {
        fetchPromise = Vacation.fetchAllPaginated(limit, offset, userRole, userId);
    }
    else {
        fetchPromise = Vacation.fetchPaginated(limit, offset, userRole, userId);
    }
    fetchPromise
        .then(([rows]) => {
            const vacations = Array.isArray(rows) ? rows : [];
            response.status(200).json(vacations);
        })
        .catch((error) => {
            console.error('Error fetching paginated requests:', error);
            response.status(500).json({ 
                success: false, 
                message: `Error al cargar las solicitudes: ${error.message}` 
            });
        });
};

exports.getAddVacation = (request, response, next) => {
    // Obtiene las vacaciones del usuario en el periodo actual
    Vacation.fetchVacationsInPeriod(request.session.userID)
        .then(([rows]) => {
            const vacations = rows;

            // Obtiene la fecha de inicio y fin del periodo del usuario
            const startDate = vacations[0].mapStart;
            const endDate = vacations[0].mapEnd;

            // Obtiene los días feriados durante el periodo del usuario
            Holiday.fetchByDateType(startDate, endDate)
                .then(([rows]) => {
                    const holidays = rows;

                    // Obtiene los años que el trabajador lleva trabajando en la compañía
                    User.fetchWorkingTime(request.session.userID)
                        .then(([rows]) => {
                            // Los años que el trabajador lleva trabajando en la compañía
                            const workingYears = rows[0].time;

                            // Mapa para tener control de los días disponibles
                            const daysMap = new Map(); 

                            // Índice para recorrer cada uno de los días
                            const currentDate = new Date(startDate);

                            // Genera un arreglo vacío para los eventos de cada día
                            while (currentDate < endDate) {
                                const dateStr = formatDate.forSql(currentDate);

                                // La llave para los elementos del mapa es la fecha en string
                                daysMap.set(dateStr, {
                                    date: new Date(currentDate),
                                    dayType: currentDate.getDay(),
                                    holiday: 0,
                                });
                                currentDate.setDate(currentDate.getDate() + 1);
                            }

                            // Marca en el mapa los días que son días feriados
                            holidays.forEach((holiday) => {
                                const date = new Date(holiday.usedDate);
                                const day = daysMap.get(formatDate.forSql(date));
                                if (day) {
                                    day.holiday = 1;
                                }
                            });

                            let totalUsedDays = 0;

                            // Procesar vacaciones
                            vacations.forEach((vacation) => {
                                const start = new Date(vacation.startDate);
                                const end = new Date(vacation.endDate);
                                const current = new Date(start);

                                // Por cada día del que la vacación es parte, verifica si es válido
                                while (current <= end) {
                                    const dateStr = formatDate.forSql(current);
                                    const day = daysMap.get(dateStr);

                                    // Verifica que no sea día festivo o fin de semana
                                    if (day && day.holiday == 0 && day.dayType != 0 && day.dayType != 6) {
                                        totalUsedDays += 1;
                                    }
                                    current.setDate(current.getDate() + 1);
                                }
                            });

                            // Obtiene la cantidad de días de vacaciones que puede tener el trabajador
                            const totalDays = () => {
                                let baseDays = 12;
                                let years = workingYears;

                                // Por cada año trabajando se le aumentan 2 días
                                while (years > 0) {
                                    baseDays += 2;
                                    years -= 1;
                                }
                                
                                return baseDays > 20 ? 20 : baseDays;
                            }

                            const availableDays = totalDays() - totalUsedDays;

                            request.session.availableDays = availableDays;

                            const startDateTextAux = new Date(startDate);
                            const endDateTextAux = new Date(endDate);
                            endDateTextAux.setDate(endDateTextAux.getDate() - 1);
                            
                            response.render("addVacation", {
                                ...sessionVars(request, title),
                                availableDays,
                                startDate: `${startDateTextAux.getFullYear()}-${String(startDateTextAux.getMonth() + 1).padStart(2, '0')}-${String(startDateTextAux.getDate()).padStart(2, '0')}`,
                                endDate: `${endDateTextAux.getFullYear()}-${String(endDateTextAux.getMonth() + 1).padStart(2, '0')}-${String(endDateTextAux.getDate()).padStart(2, '0')}`,

                            })


                        });
                });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Error al obtener los datos.');
        });
};

exports.postAddVacation = (request, response, next) => {
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;

    console.log("Fecha inicio", startDate);
 
    // En caso de que la fecha de inicio sea posterior a la final
    if ((new Date(startDate)) > (new Date(endDate))) {
        request.session.alert = "The start date must be before the end date";
        return response.redirect("/vacation/add");
    }

    // Obtiene los días feriados durante el periodo que solicitó el usuario
    Holiday.fetchByDateType(startDate, endDate)
        .then(([rows]) => {
            const holidays = rows;

            // Mapa para tener control de los días disponibles
            const daysMap = new Map(); 

            // Índice para recorrer cada uno de los días
            const currentDate = new Date(startDate);
            const endDateLoop = new Date(endDate);

            // Genera un arreglo vacío para los eventos de cada día
            while (currentDate <= endDateLoop) {
                const dateStr = formatDate.forSql(currentDate);

                // La llave para los elementos del mapa es la fecha en string
                daysMap.set(dateStr, {
                    date: new Date(currentDate),
                    dayType: currentDate.getDay(),
                    holiday: 0,
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }

            // Marca en el mapa los días que son días feriados
            holidays.forEach((holiday) => {
                const date = new Date(holiday.usedDate);
                const day = daysMap.get(formatDate.forSql(date));
                if (day) {
                    day.holiday = 1;
                }
            });

            // Obtiene los días que no cuentan para las vacaciones
            let nonusableDays = 0;
            daysMap.forEach((day, key) => {
                // Verifica si el día es festivo o fin de semana
                console.log(`${key} => ${['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][day.dayType]} | holiday: ${day.holiday} | dayNumber: ${day.dayType}`);
                if (day.holiday == 1 || day.dayType == 5 || day.dayType == 6) {
                    nonusableDays += 1;
                }
            });

            // Obtiene los días válidos que solicitó el usuario
            const dateDiff = Number(new Date(endDate)) - Number(new Date(startDate));
            const requestDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24)) + 1 - nonusableDays;
            console.log("requested: ", requestDays);
            console.log("nonusable: ", nonusableDays);

            // En caso de que el usuario haya solicitado más días de los que tiene disponibles
            if(requestDays > request.session.availableDays){
                request.session.alert = "You cannot request more days than the ones available";
                return response.redirect("/vacation/add");
            }

            // Genera la vacación
            const vacation = new Vacation(
                request.session.userID,
                request.body.startDate,
                request.body.endDate,
                request.body.reason
            );

            // Guarda la vacación
            vacation.save()
                .then(() => {
                    request.session.info = 'Your request was submitted without any problem.';
                    return response.redirect('/calendar');
                });

        }).catch((error) => {
            request.session.alert = 'There was an error trying to sumbit your request.';
            response.redirect('/vacation/add');
            return next();
        });
};

exports.getCheckVacation = (request, response, next) => {
    const vacationID = request.params.vacationID; // Obtener el ID de la vacación desde la URL

    Vacation.fetchOne(vacationID)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).send('Solicitud de vacaciones no encontrada.');
            }
            
            const selectedVacation = rows[0];

            // Por ejemplo, calcular la diferencia en días sin descontar feriados ni fines de semana
            const start = new Date(selectedVacation.startDate);
            const end = new Date(selectedVacation.endDate);
            const diffTime = Math.abs(end - start);
            const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir ambos extremos

            response.render('checkVacation', {
                ...sessionVars(request, title),
                vacation: selectedVacation,
                requestedDays: totalDays
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Error al obtener los datos.');
        });
};


exports.getModifyVacation = async (request, response, next) => {
    try {
        const vacationID = request.params.vacationID;
        const [rows] = await Vacation.fetchOne(vacationID);

        if (rows.length === 0) {
            return response.status(404).send('Vacation not found.');
        }

        const selectedVacation = rows[0];
        const userID = request.session.userID;

        // 1. Obtener el período vigente de vacaciones (se asume que fetchVacationsInPeriod retorna mapStart y mapEnd)
        const [periodRows] = await Vacation.fetchVacationsInPeriod(userID);
        if (!periodRows || periodRows.length === 0) {
            throw new Error("Error with the period of vacation.");
        }
        const periodStart = periodRows[0].mapStart;
        const periodEnd = periodRows[0].mapEnd;

        // 2. Obtener los feriados dentro del período vigente
        const [holidayRows] = await Holiday.fetchByDateType(periodStart, periodEnd);
        const holidays = holidayRows;

        // 3. Función auxiliar: construir un mapa de días para un rango dado
        const buildDayMap = (start, end, holidays) => {
            const map = new Map();
            const endDateLoop = new Date(end);
            let current = new Date(start);

            while (current <= endDateLoop) {
                const dateStr = formatDate.forSql(current);
                map.set(dateStr, {
                    date: new Date(current),
                    dayType: current.getDay(), // 0: domingo, 6: sábado
                    holiday: 0,
                });
                current.setDate(current.getDate() + 1);
            }

            holidays.forEach((holiday) => {
                const date = new Date(holiday.usedDate);
                const key = formatDate.forSql(date);
                if (map.has(key)) {
                    map.get(key).holiday = 1;
                }
            });
            return map;
        };

        // 4. Función auxiliar: contar los días útiles (días que cuentan para vacaciones) del mapa
        // Se excluyen días feriados y fines de semana (domingo = 0 y sábado = 6)
        const countUsableDays = (map) => {
            let nonusable = 0;
            map.forEach((day) => {
                if (day.holiday === 1 || day.dayType === 0 || day.dayType === 6) {
                    nonusable++;
                }
            });
            return map.size - nonusable;
        };

        // 5. Construir el mapa de días para el período vigente y contar los días usados en vacaciones aprobadas.
        // Se asume que en periodRows están incluidas las vacaciones aprobadas o, en caso contrario, se debería obtener ese listado.
        const periodDayMap = buildDayMap(periodStart, periodEnd, holidays);
        let totalUsedDays = 0;
        periodRows.forEach(vac => {
            // Se asume que para contar los días usados se consideran solo las vacaciones aprobadas.
            // Si la lógica de aprobación es distinta, ajústala según tu aplicación.
            if (vac.leaderStatus * vac.hrStatus !== 0) {
                const start = new Date(vac.startDate);
                const end = new Date(vac.endDate);
                let current = new Date(start);
                while (current <= end) {
                    const key = formatDate.forSql(current);
                    const day = periodDayMap.get(key);
                    if (day && day.holiday === 0 && day.dayType !== 0 && day.dayType !== 6) {
                        totalUsedDays++;
                    }
                    current.setDate(current.getDate() + 1);
                }
            }
        });

        // 6. Obtener el tiempo de servicio del usuario para calcular días asignados
        const [timeRows] = await User.fetchWorkingTime(userID);
        const workingYears = timeRows[0].time;

        // 7. Calcular los días totales asignados: 12 días base + 2 por cada año, hasta máximo 20
        let baseDays = 12;
        let years = workingYears;
        while (years > 0) {
            baseDays += 2;
            years -= 1;
        }
        baseDays = baseDays > 20 ? 20 : baseDays;

        // 8. Días disponibles = días asignados - días usados
        const availableDays = baseDays - totalUsedDays;

        response.render('modifyVacation', {
            ...sessionVars(request, title),
            vacation: selectedVacation,
            availableDays
        });
    } catch (error) {
        console.error('Error al obtener la vacación:', error);
        response.status(500).send('Error interno del servidor.');
    }
};



exports.updateVacation = async (request, response, next) => {
    const vacationId = request.params.vacationID;
    const { startDate, endDate, reason } = request.body;

    if (!startDate || !endDate || !reason) {
        request.session.info = 'You need to complete all the fields.';
        try {
            const [rows] = await Vacation.fetchOne(vacationId);
            if (rows.length === 0) {
                return response.status(404).send('Vacation not found.');
            }
            return response.render('modifyVacation', {
                ...sessionVars(request, title),
                vacation: rows[0],
                availableDays: request.session.availableDays || 0
            });
        } catch (error) {
            console.error(error);
            return response.status(500).send('Error interno del servidor.');
        }
    }

    if (new Date(startDate) > new Date(endDate)) {
        request.session.alert = "The end date needs to be more recents that the started date.";
        return response.redirect(`/vacation/check/modify/${vacationId}`);
    }

    try {
        const [holidayRows] = await Holiday.fetchByDateType(startDate, endDate);
        const holidays = holidayRows;

        const buildDayMap = (start, end, holidays) => {
            const map = new Map();
            const endDateLoop = new Date(end);
            let current = new Date(start);
            while (current <= endDateLoop) {
                const dateStr = formatDate.forSql(current);
                map.set(dateStr, {
                    date: new Date(current),
                    dayType: current.getDay(),
                    holiday: 0,
                });
                current.setDate(current.getDate() + 1);
            }

            holidays.forEach((holiday) => {
                const date = new Date(holiday.usedDate);
                const key = formatDate.forSql(date);
                if (map.has(key)) {
                    map.get(key).holiday = 1;
                }
            });

            return map;
        };

        const countUsableDays = (map) => {
            let nonusable = 0;
            map.forEach((day) => {
                if (day.holiday === 1 || day.dayType === 0 || day.dayType === 6) {
                    nonusable++;
                }
            });
            return map.size - nonusable;
        };

        const calculateAvailableDays = async (userID, holidays) => {
            const [periodRows] = await Vacation.fetchVacationsInPeriod(userID);
            if (!periodRows || periodRows.length === 0) {
                throw new Error("Error with the period.");
            }
            const periodStart = periodRows[0].mapStart;
            const periodEnd = periodRows[0].mapEnd;

            const vacations = periodRows;
            const dayMap = new Map();
            const endDateLoop = new Date(periodEnd);
            let current = new Date(periodStart);
            while (current <= endDateLoop) {
                const dateStr = formatDate.forSql(current);
                dayMap.set(dateStr, {
                    date: new Date(current),
                    dayType: current.getDay(),
                    holiday: 0,
                });
                current.setDate(current.getDate() + 1);
            }

            holidays.forEach(holiday => {
                const date = new Date(holiday.usedDate);
                const key = formatDate.forSql(date);
                if (dayMap.has(key)) {
                    dayMap.get(key).holiday = 1;
                }
            });

            let totalUsedDays = 0;
            vacations.forEach(vac => {
                const start = new Date(vac.startDate);
                const end = new Date(vac.endDate);
                let cur = new Date(start);
                while (cur <= end) {
                    const key = formatDate.forSql(cur);
                    const day = dayMap.get(key);
                    if (day && day.holiday === 0 && day.dayType !== 0 && day.dayType !== 6) {
                        totalUsedDays++;
                    }
                    cur.setDate(cur.getDate() + 1);
                }
            });

            const [timeRows] = await User.fetchWorkingTime(userID);
            const workingYears = timeRows[0].time;
            let baseDays = 12 + Math.min(workingYears, 4) * 2;
            baseDays = baseDays > 20 ? 20 : baseDays;
            return baseDays - totalUsedDays;
        };

        const newDaysMap = buildDayMap(startDate, endDate, holidays);
        const totalDaysRequested = countUsableDays(newDaysMap);

        const [originalVacationRows] = await Vacation.fetchOne(vacationId);
        if (!originalVacationRows || originalVacationRows.length === 0) {
            request.session.alert = "Vacación no encontrada.";
            return response.redirect('/vacation/history');
        }

        const originalVacation = originalVacationRows[0];
        const originalDaysMap = buildDayMap(originalVacation.startDate, originalVacation.endDate, holidays);
        const originalTotalDays = countUsableDays(originalDaysMap);

        const recalculatedAvailableDays = await calculateAvailableDays(request.session.userID, holidays);
        const availableIncludingOriginal = recalculatedAvailableDays + originalTotalDays;

        if (totalDaysRequested > availableIncludingOriginal) {
            request.session.alert = `Can not update the request with more days that you have (available: ${availableIncludingOriginal}, Requested: ${totalDaysRequested})`;
            return response.redirect(`/vacation/check/modify/${vacationId}`);
        }

        // Obtener el ID del usuario asociado a la vacación
        const getUserResult = await Vacation.getUserID(vacationId);
        // Verificar el formato del resultado
        let userRows;
        if (Array.isArray(getUserResult)) {
            userRows = getUserResult[0];
        } else if (getUserResult && getUserResult.rows) {
            userRows = getUserResult.rows;
        } else {
            throw new Error("Error with the id of user to the vacation");
        }

        if (!userRows || userRows.length === 0) {
            request.session.alert = "Vacation not found";
            return response.redirect("/vacation");
        }
        if (userRows[0].vacationUserIDFK != request.session.userID) {
            request.session.alert = "Cannot change the request of other";
            return response.redirect("/vacation");
        }

        // Actualizar la vacación
        await Vacation.updateVacation(vacationId, startDate, endDate, reason);
        request.session.info = 'Update of the vacation correctly';

        // Luego de actualizar, redirigimos a la ruta de listado o historial de vacaciones.
        return response.redirect('/vacation');

    } catch (error) {
        console.error('Error al actualizar la vacación:', error);
        request.session.info = 'Error for update the request';
        try {
            const [rows] = await Vacation.fetchOne(vacationId);
            // Se decide redirigir en lugar de renderizar para mantener consistencia
            return response.redirect('/vacation');
        } catch (fetchError) {
            console.error(fetchError);
            return response.status(500).send('Error interno del servidor.');
        }
    }
};


exports.postRequestApprove = async (request, response, next) => {
    try {
        const vacationId = request.params.vacationID;
        const userRole = request.session.role;

        const [vacationRows] = await Vacation.fetchOne(vacationId);
        if (vacationRows.length === 0) {
            return response.status(404).json({
            success: false,
            message: 'Solicitud no encontrada'
            });
        }

        const [employeeRows] = await Vacation.fetchOneEmployee(vacationRows[0]['vacationUserIDFK']);
        // TODO: CAMBIAR LA VARIABLE phoneNumber A ALGO PARECIDO A LA VARIABLE "employeeName" PUES POR AHORA
        // TODO: SÓLO UNA VARIABLE DE ENTORNO.
        const phoneNumber = process.env.NUMBER_TEST;
        const requestName = 'vacaciones';
        const employeeName = employeeRows[0]['birthName'];
        const statusName = 'aprobado';
        let roleName;

        // En el controlador vacations.controller.js
        if (userRole === 'Human Resources') {
            roleName = 'Recursos humanos';
            try {
                await sendTemplateMessage(phoneNumber, employeeName, requestName, statusName, roleName);
                await Vacation.updateStatusHR(vacationId, 1);
            } catch (error) {
                console.error("Error al enviar el template:", error.response ? error.response.data : error.message);
                return response.status(500).json({
                    success: false,
                    message: error.message || 'Error al procesar la solicitud'
                });
            }
        } else if (userRole === 'Department Leader') {
            roleName = 'Lider de departamento';
            try {
                await sendTemplateMessage(phoneNumber, employeeName, requestName, statusName, roleName);
                await Vacation.updateStatusLeader(vacationId, 1);
                // await Vacation.fetchDepartmentPaginated(userId, 1, 0);
            } catch (error) {
                console.error("Error al enviar el template:", error.response ? error.response.data : error.message);  
                return response.status(500).json({
                    success: false,
                    message: error.message || 'Error al procesar la solicitud'
                });
            }
        } else {
            return response.status(403).json({
                success: false,
                message: 'Rol no autorizado'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Solicitud aprobada exitosamente'
        });
        } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || 'Error al procesar la solicitud'
        });
    }
};

exports.postRequestDeny = async (request, response, next) => {
    try {
        const vacationId = request.params.vacationID;
        const userRole = request.session.role;
        const userId = request.session.userID;

        const [vacationRows] = await Vacation.fetchOne(vacationId);
        if (vacationRows.length === 0) {
            return response.status(404).json({
            success: false,
            message: 'Solicitud no encontrada'
            });
        }

        const [employeeRows] = await Vacation.fetchOneEmployee(vacationRows[0]['vacationUserIDFK']);
        // TODO: CAMBIAR LA VARIABLE phoneNumber A ALGO PARECIDO A LA VARIABLE "employeeName" PUES POR AHORA
        // TODO: SÓLO UNA VARIABLE DE ENTORNO.
        const phoneNumber = process.env.NUMBER_TEST;
        const requestName = 'vacaciones';
        const employeeName = employeeRows[0]['birthName'];
        const statusName = 'denegado';
        let roleName;
        if (userRole === 'Human Resources') {
            roleName = 'Recursos humanos';
            try {
                await sendTemplateMessage(phoneNumber, employeeName, requestName, statusName, roleName);
                await Vacation.updateStatusHR(vacationId, 0);
            } catch (error) {
                console.error("Error al enviar el template:", error.response ? error.response.data : error.message);
                return response.status(500).json({
                    success: false,
                    message: error.message || 'Error al procesar la solicitud'
                });
            }
        } else if (userRole === 'Department Leader') {
            roleName = 'Lider de departamento';
            try {
                await sendTemplateMessage(phoneNumber, employeeName, requestName, statusName, roleName);
                await Vacation.updateStatusLeader(vacationId, 0);
                // await Vacation.fetchDepartmentPaginated(userId, 1, 0);
            } catch (error) {
                console.error("Error al enviar el template:", error.response ? error.response.data : error.message);  
                return response.status(500).json({
                    success: false,
                    message: error.message || 'Error al procesar la solicitud'
                });
            }
        } else {
            return response.status(403).json({
                success: false,
                message: 'Rol no autorizado'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Solicitud aprobada exitosamente'
        });
        } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || 'Error al procesar la solicitud'
        });
    }
};


exports.PostDeleteVacation = (request, response, next) => {
    const vacationId = request.params.vacationID;

    Vacation.getUserID(vacationId)
        .then(([rows]) => {
            const vacationUserID = rows[0].vacationUserIDFK;
            if (vacationUserID == request.session.userID) {
                Vacation.deleteVacation(vacationId)
                    .then(() => {
                        response.status(200).json({ message: 'Solicitud eliminada correctamente' });
                    })
            } else {
                console.error('Error al eliminar solicitud, no eres el dueño:', error);
                response.status(500).json({ message: 'Error al eliminar la solicitud, no eres el dueño' });
            }
        })
        .catch((error) => {
            console.error('Error al eliminar solicitud:', error);
            response.status(500).json({ message: 'Error al eliminar la solicitud' });
        });

    
};

exports.getRoot = (request, response, next) => {
    // El ID del usuario actual
    const userID = request.session.userID;

    // Obtiene todas las vacaciones relacionadas a ese usuario
    Vacation.fetchAllVacation(userID)
        .then(([vacations]) => {
            // Obtiene las solicitudes del usuario en el periodo actual
            Vacation.fetchRequestsInPeriod(userID)
                .then(([requests]) => {
                    // Obtiene la fecha actual para saber si la solicitud ya pasó
                    const currentDate = new Date();

                    // Vacaciones anteriormente tomadas (todos los periodos)
                    const usedVacations = vacations.filter((vacation) =>
                        vacation.leaderStatus === 1 && vacation.hrStatus === 1 && (new Date(vacation.startDate) <= currentDate)
                    );

                    // Solicitudes aprobadas
                    const approvedRequests = requests.filter((vacation) =>
                        vacation.leaderStatus === 1 && vacation.hrStatus === 1 && (new Date(vacation.startDate) > currentDate)
                    );

                    // Solicitudes pendientes por responder
                    const pendingRequests = requests.filter((vacation) =>
                        !(vacation.leaderStatus === 1 && vacation.hrStatus === 1) && !(vacation.leaderStatus === 0 || vacation.hrStatus === 0) && vacation.vacationID != null
                    );

                    // Solicitudes denegadas por alguien
                    const deniedRequests = requests.filter((vacation) =>
                        vacation.leaderStatus === 0 || vacation.hrStatus === 0
                    );
                    
                    response.render('ownVacation', {
                        ...sessionVars(request, title),
                        usedVacations,
                        approvedRequests,
                        pendingRequests,
                        deniedRequests,
                    });

                });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Error al obtener los datos.');
        });
};