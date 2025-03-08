exports.getHolidays = (req, res, next) => {
    res.render('holiday');
};

exports.getHolidaysAdd = (req, res, next) => {
    res.render('holidayAdd');
};

exports.getHoliday = (req, res, next) => {
    res.render('holidayCheck');
};

exports.getHolidayModify = (req, res, next) => {
    res.render('holidayModify');
};