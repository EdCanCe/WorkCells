const absenceMedia = require('../models/absenceMedia.model');
const faultsMedia = require('../models/faultsMedia.model');
const department = require('../models/department.model');
const openFile = require('../util/openFile');

exports.getAbsenceFile = (request, response, next) => {
    // Verifica que tenga permisos para ver el archivo
    absenceMedia.getOwner(request.params.mediaLink)
        .then(([rows]) => {
            console.log('rows: ', rows);

            // Verifica que sea el dueño
            if (rows[0].userID === request.session.userID) {
                console.log('aaaa');
                return openFile(request, response);
            } 

            // Verifica que sea SuperAdmin
            if (request.session.role === 'Human Resources') {
                console.log('bbbbb');
                return openFile(request, response);
            }

            // Verifica que sea líder
            if (request.session.role === 'Department Leader') {
                console.log('cccc');
                return absenceMedia.getOwnersLeader(request.params.mediaLink)
                    .then(([rows]) => {
                        // Significa que ese es el líder
                        if (rows[0].userID === request.session.userID) {
                            return openFile(request, response);
                        }
                    });
            }

            // No es dueño ni es SuperAdmin
            throw 'You have no permission to view this';
        })
        .catch((error) => {
            request.session.alert = error;
            response.redirect('/error');
        });
};


exports.getFaultFile = (request, response, next) => {
    // Verifica que tenga permisos para ver el archivo
    faultsMedia.getOwner(request.params.mediaLink)
        .then(([rows]) => {
            // Verifica que sea el dueño
            if (rows[0].userID === request.session.userID) {
                return openFile(request, response);
            } 

            // Verifica que sea SuperAdmin
            if (request.session.role === 'Human Resources') {
                return openFile(request, response);
            }

            // No es dueño ni es SuperAdmin
            throw 'You have no permission to view this';
        })
        .catch((error) => {
            request.session.alert = error;
            response.redirect('/error');
        });
};
