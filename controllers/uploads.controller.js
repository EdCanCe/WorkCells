const path = require("path");
const fs = require("fs");
const sessionVars = require("../util/sessionVars");

exports.getAbsenceFile = (request, response, next) => {
    const fileName = request.params.mediaLink;
    const directory = path.join(__dirname, "..", "uploads");
    const file = path.join(directory, fileName);

    fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
            return response.status(404).render("notFound", {
                ...sessionVars(request),
            });
        }

        response.sendFile(file);
    });
};
