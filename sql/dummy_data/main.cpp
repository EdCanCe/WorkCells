#include <bits/stdc++.h>
#include "privileges.h"
#include "roles.h"
#include "rolePrivileges.h"
#include "countries.h"
#include "users.h"
#include "enterprise.h"
#include "department.h"
#include "userDepartment.h"
#include "vacations.h"
#include "absence.h"
#include "absenceMedia.h"

using namespace std;

int main() {

    srand (time(NULL));

    freopen("addData.sql", "w", stdout);  // Pasa el output a un archivo

    createPrivileges();
    privileges.print();

    createRoles();
    roles.print();

    createRolePrivileges();
    rolePrivileges.print();

    createCountries();
    countries.print();
    
    createEnterprise(20);
    enterprise.print();

    createDepartment(20);
    department.print();

    createUsers(100);
    users.print();

    createUserDepartment(160);
    userDepartment.print();
    selectUserPriorityDepartment();

    createVacations(20);
    vacations.print();
    
    createAbsence(20);
    absence.print();
    
    createAbsenceMedia(20);
    absenceMedia.print();
}