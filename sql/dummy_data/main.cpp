#include <bits/stdc++.h>
#include "privileges.h"
#include "roles.h"

using namespace std;

int main() {

    srand (time(NULL));

    freopen("addData.sql", "w", stdout);  // Pasa el output a un archivo

    createPrivileges(50); // Manda a llamar el archivo privileges.h para crear privilegios
    privileges.print();

    createRoles(); // Como siempre serán los mismos roles, no especifiqué
    roles.print();

}