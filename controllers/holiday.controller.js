exports.getHolidays = (require, response, next) => {
  response.render("holiday");
};

exports.getHolidaysAdd = (require, response, next) => {
  response.render("holidayAdd");
};

exports.postHolidaysAdd = (require, response, next) => {};

exports.getHoliday = (require, response, next) => {
  response.render("holidayCheck");
};

exports.getHolidayModify = (require, response, next) => {
  response.render("holidayModify");
};
