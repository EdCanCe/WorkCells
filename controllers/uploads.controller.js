const AbsenceMedia = require("../models/absenceMedia.model");
const FaultsMedia = require("../models/faultsMedia.model");
const openFile = require("../util/openFile");

exports.getAbsenceFile = (request, response, next) => {
    // Verifica que tenga permisos para ver el archivo
    AbsenceMedia.getOwner(request.params.mediaLink)
        .then(([rows]) => {
            // Verifica que sea el dueño
            if (rows[0].userID === request.session.userID) {
                return openFile(request, response);
            }

            // Verifica que sea SuperAdmin
            if (request.session.role === "Manager") {
                return openFile(request, response);
            }

            // Verifica que sea líder
            if (request.session.role === "Department Leader") {
                return AbsenceMedia.getOwnersLeader(
                    request.params.mediaLink
                ).then(([rows]) => {
                    // Significa que ese es el líder
                    if (rows[0].userID === request.session.userID) {
                        return openFile(request, response);
                    }
                });
            }

            // No es dueño ni es SuperAdmin
            throw "You have no permission to view this";
        })
        .catch((error) => {
            request.session.alert = error;
            response.redirect("/error");
        });
};

exports.getFaultFile = (request, response, next) => {
    // Verifica que tenga permisos para ver el archivo
    FaultsMedia.getOwner(request.params.mediaLink)
        .then(([rows]) => {
            // Verifica que sea el dueño
            if (rows[0].userID === request.session.userID) {
                return openFile(request, response);
            }

            // Verifica que sea SuperAdmin
            if (request.session.role === "Manager") {
                return openFile(request, response);
            }

            // No es dueño ni es SuperAdmin
            throw "You have no permission to view this";
        })
        .catch((error) => {
            request.session.alert = error;
            response.redirect("/error");
        });
};
