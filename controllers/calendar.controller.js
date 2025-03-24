const Vacation = require("../models/vacation.model");
const Absence = require("../models/absence.model");
const OneToOne = require("../models/oneToOne.model");
const Holiday = require("../models/holiday.model");

exports.getRoot = (req, res, next) => {
  let isMonthView = req.cookies.isMonthView || 1;
  res.cookie('isMonthView', isMonthView, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    httpOnly: true
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
    return date.toISOString().split('T')[0];
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
              OneToOne.fetchByDateType(sqlStartDate, sqlEndDate, req.session.userID)
                .then(([rows, fieldData]) => {
                  oneToOneRows = rows;

                  console.log(holidayRows);
                  console.log(vacationRows);
                  console.log(absenceRows);
                  console.log(oneToOneRows);



                  res.render('calendar', {
                    isMonthView,
                    startDate,
                    endDate,
                    holidays: holidayRows[0] || [],
                    vacations: vacationRows[0] || [],
                    absences: absenceRows[0] || [],
                    oneToOnes: oneToOneRows[0] || []
                  });
                })
                .catch((error) => {
                  console.error(error); // Mejor manejo de error
                  res.status(500).send("Error al obtener los datos.");
                });
            })
            .catch((error) => {
              console.error(error); // Mejor manejo de error
              res.status(500).send("Error al obtener los datos.");
            });
        })
        .catch((error) => {
          console.error(error); // Mejor manejo de error
          res.status(500).send("Error al obtener los datos.");
        });
    })
    .catch((error) => {
      console.error(error); // Mejor manejo de error
      res.status(500).send("Error al obtener los datos.");
    });



};