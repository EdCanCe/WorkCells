exports.getOneToOne = (req, res, next) => {
    res.render('oneToOne');
};

exports.getOneToOneSchedule = (req, res, next) => {
    res.render('oneToOne_add', {
        csrfToken: req.csrfToken(),
        info: req.session.info || '',
    });
};

exports.postOneToOneSchedule = (req, res, next) => {

};

exports.getOneToOneFill = (req, res, next) => {
    res.render('oneToOneFill');
};

exports.getOneToOneGraphs = (req, res, next) => {
    res.render('oneToOneGraphs');
};

exports.getOneToOneCheck = (req, res, next) => {
    res.render('oneToOneCheck');
};