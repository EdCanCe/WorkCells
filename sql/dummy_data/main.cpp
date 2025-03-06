#include <bits/stdc++.h>
#include "privileges.h"
#include "roles.h"
#include "rolePrivileges.h"
#include "countries.h"
#include "users.h"

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

    createUsers(100);
    users.print();

}