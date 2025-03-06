#include <iostream>
#include <vector>
#include "privileges.h"
#include "roles.h"
#include "rolePrivileges.h"
#include "countries.h"
#include "users.h"
#include "enterprise.h"
#include "department.h"
#include "kpi.h"

using namespace std;

int main() {

    srand (time(NULL));

    freopen("addData.sql", "w", stdout);  // Pasa el output a un archivo

    createPrivileges(10); // Manda a llamar el archivo privileges.h para crear privilegios
    privileges.print();

    createRoles(); // Como siempre serán los mismos roles, no especifiqué número
    roles.print();

    createRolePrivileges(10);
    rolePrivileges.print();

    createCountries();
    countries.print();

    createUsers(100);
    users.print();

    createEnterprise(20);
    enterprise.print();

    createDepartment(20);
    department.print();

    //createUserDepartment(?);
    //userDepartment.print();

    createKpi(10);
    kpi.print();
}