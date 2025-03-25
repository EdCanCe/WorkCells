const OneToOne = require('../models/oneToOne.model');

exports.getOneToOne = (req, res, next) => {
    res.render('oneToOne');
};

exports.getOneToOneSchedule = (req, res, next) => {
    res.render('oneToOneAdd', {
        csrfToken: req.csrfToken(),
        info: req.session.info || '',
    });
};

exports.postOneToOneSchedule = (req, res, next) => {
    console.log(req.body)
    OneToOne.getID(req.body.email)
        .then(([rows]) => {
            if(rows.length == 0)
            {
                res.send(400).status('USUARIO NO ENCONTRADO')
            }
            const oneOnOneUserIDFK = rows[0].userID;
            console.log(oneOnOneUserIDFK);
            const meetingDate = req.body.date + " " + req.body.time + ":00";
            console.log(meetingDate)
            const meeting = new OneToOne(req.body.expectedTime, meetingDate, 
                oneOnOneUserIDFK);
            
            meeting.save()
                .then(() => {
                    req.session.info = `Sesión de one to one para el 
                        ${meetingDate} con ${req.body.name} creada`;
                    res.redirect('/oneToOne/schedule');
                })
                .catch((err) => {
                    console.log(err);
                });
        })
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