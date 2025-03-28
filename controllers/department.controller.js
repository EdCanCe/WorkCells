exports.getDepartments = (req, res, next) => {
    res.render('checkDepartment');
}

exports.getAddDepartment = (req, res, next) => {
    res.render('addDepartment');
};

exports.getCheckDepartment = (req, res, next) => {
    res.render('checkOneDpmt')
};

exports.getModifyDepartment = (req, res, next) => {
    res.render('modifyDepartment')
};