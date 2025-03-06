#include <bits/stdc++.h>
#include "privileges.h"
#include "roles.h"
#include "rolePrivileges.h"
#include "countries.h"
#include "users.h"
#include "templateHoliday.h"
#include "usedHoliday.h"

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

    createTemplateHolidays(5);
    templateHolidays.print();

    createUsedHolidays(10);
    usedHolidays.print();
}