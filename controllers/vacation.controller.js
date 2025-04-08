const Vacation = require('../models/vacation.model');
const Holiday = require('../models/holiday.model');
const User = require('../models/user.model');
const formatDate = require('../util/formatDate');
const sessionVars = require('../util/sessionVars');
const { end } = require('../util/database');

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
                ...sessionVars(request),
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
                ...sessionVars(request),
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
                                ...sessionVars(request),
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

            response.render('checkVacation', {
                ...sessionVars(request),
                vacation: selectedVacation,
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
            return response.status(404).send('Vacación no encontrada.');
        }

        const selectedVacation = rows[0];

        response.render('modifyVacation', {
            ...sessionVars(request),
            vacation: selectedVacation,
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
        request.session.info = 'Todos los campos son obligatorios.';

        try {
            const [rows] = await Vacation.fetchOne(vacationId);
            if (rows.length === 0) {
                return response.status(404).send('Vacación no encontrada.');
            }

            return response.render('modifyVacation', {
                ...sessionVars(request),
                vacation: rows[0], 
            });
        } catch (error) {
            console.error(error);
            return response.status(500).send('Error interno del servidor.');
        }
    }

    try {
        await Vacation.updateVacation(vacationId, startDate, endDate, reason);
        request.session.info = 'Solicitud de vacaciones actualizada exitosamente.';

        const [rows] = await Vacation.fetchOne(vacationId);
        return response.render('modifyVacation', {
            ...sessionVars(request),
            vacation: rows[0], // Pasamos la vacación actualizada
        });
    } catch (error) {
        console.error(error);
        request.session.info = 'Error al actualizar la solicitud.';

        try {
            const [rows] = await Vacation.fetchOne(vacationId);
            return response.render('modifyVacation', {
                ...sessionVars(request),
                vacation: rows[0], // Pasamos la vacación incluso en caso de error
            });
        } catch (fetchError) {
            console.error(fetchError);
            return response.status(500).send('Error interno del servidor.');
        }
    }
};


exports.postRequestApprove = (request, response, next) => {
    const vacationId = request.params.vacationID;
    const userRole = request.session.role;
    const userId = request.session.userID;

    // Verificar si el usuario tiene permiso para aprobar esta solicitud
    Vacation.fetchOne(vacationId)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).json({
                    success: false,
                    message: 'Solicitud no encontrada'
                });
            }

            const vacation = rows[0];
            
            // Si es RRHH, actualiza el estado de RRHH sin importar el estado del líder
            if (userRole === 'Human Resources') {
                return Vacation.updateStatusHR(vacationId, 1); // 1 = Aprobado
            }
            // Si es líder, actualiza el estado del líder
            else if (userRole === 'Department Leader') { // Cambiado de 'Leader' a 'Department Leader'
                return Vacation.fetchDepartmentPaginated(userId, 1, 0)
                    .then(([departmentVacations]) => {
                        const hasPermission = departmentVacations.some(v => v.vacationID === vacationId);
                        if (!hasPermission) {
                            throw new Error('No tienes permiso para aprobar esta solicitud');
                        }
                        return Vacation.updateStatusLeader(vacationId, 1);
                    });
            }
            else {
                throw new Error('Rol no autorizado');
            }
        })
        .then(() => {
            response.status(200).json({
                success: true,
                message: 'Solicitud aprobada exitosamente'
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({
                success: false,
                message: error.message || 'Error al procesar la solicitud'
            });
        });
};

exports.postRequestDeny = (request, response, next) => {
    const vacationId = request.params.vacationID;
    const userRole = request.session.role;
    const userId = request.session.userID;

    // Verificar si el usuario tiene permiso para denegar esta solicitud
    Vacation.fetchOne(vacationId)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).json({
                    success: false,
                    message: 'Solicitud no encontrada'
                });
            }
            const vacation = rows[0];
            // Si es RRHH, actualiza el estado de RRHH sin importar el estado del líder
            if (userRole === 'Human Resources') {
                // Elimina la restricción de verificar el estado del líder
                return Vacation.updateStatusHR(vacationId, 0); // 0 = Denegado
            }
            // Si es líder, actualiza el estado del líder
            else if (userRole === 'Department Leader') {
                return Vacation.fetchDepartmentPaginated(userId, 1, 0)
                    .then(([departmentVacations]) => {
                        const hasPermission = departmentVacations.some(v => v.vacationID === vacationId);
                        if (!hasPermission) {
                            throw new Error('No tienes permiso para denegar esta solicitud');
                        }
                        return Vacation.updateStatusLeader(vacationId, 0);
                    });
            }
            else {
                throw new Error('Rol no autorizado');
            }
        })
        .then(() => {
            response.status(200).json({
                success: true,
                message: 'Solicitud denegada exitosamente'
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({
                success: false,
                message: error.message || 'Error al procesar la solicitud'
            });
        });
};


exports.PostDeleteVacation = (request, response, next) => {
    const vacationId = request.params.vacationID;

    Vacation.deleteVacation(vacationId)
        .then(() => {
            response.status(200).json({ message: 'Solicitud eliminada correctamente' });
        })
        .catch((error) => {
            console.error('Error al eliminar solicitud:', error);
            response.status(500).json({ message: 'Error al eliminar la solicitud' });
        });
};



exports.getRoot = (request, response, next) => {
    const userID = request.session.userID;
    // const userRole = request.session.role;
    // console.log('userRole', userRole);
    Vacation.fetchAllVacation(userID)
        .then(([rows]) => {
            // Vacaciones aprobadas: ambas aprobadas (valor 1)
            const approvedVacations = rows.filter(
                (vacation) =>
                    vacation.leaderStatus === 1 && vacation.hrStatus === 1
            );

            // Vacaciones pendientes: si alguno está pendiente (valor 2)
            const pendingVacations = rows.filter(
                (vacation) =>
                    vacation.leaderStatus === 2 || vacation.hrStatus === 2
            );

            response.render('ownVacation', {
                ...sessionVars(request),
                approvedVacations,
                pendingVacations,
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Error al obtener los datos.');
        });
};