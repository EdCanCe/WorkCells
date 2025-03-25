exports.get_departments = (req, res, next) => {
    res.render('checkDepartment');
}

exports.get_add_department = (req, res, next) => {
    res.render('addDepartment');
};

exports.get_check_department = (req, res, next) => {
    res.render('checkOneDpmt')
};

exports.get_modify_department = (req, res, next) => {
    res.render('modifyDepartment')
};