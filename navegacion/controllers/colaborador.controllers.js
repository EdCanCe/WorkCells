exports.get_kpis = (request, response, next) => {
  response.send('kpis');
};

exports.get_absence = (request, response, next) => {
  response.send('Ausencias');
};

exports.get_vacation = (request, response, next) => {
  response.send('vacaciones');
};

exports.get_onetoOne = (request, response, next) => {
  response.send('oneonone');
};

exports.get_calendar = (request, response, next) => {
  response.render('calendario');
};

exports.get_myprofile = (request, response, next) => {
  response.render('myprofile');
};

exports.get_moreinformation = (request, response, next) =>{
  response.render('moreinfoc');
}

exports.get_administrativeoffenses = (request, response, next) =>{
  response.send('administrativeoffenses');
}

exports.get_root =  (request, response, next) =>{
  response.render('inicio');
}
