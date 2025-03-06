#include <bits/stdc++.h>
#include "privileges.h"
#include "roles.h"
#include "rolePrivileges.h"
#include "countries.h"
#include "users.h"
#include "question.h"
#include "mesurable.h"
#include "oneonone.h"
#include "answer.h"

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

    createQuestions(10);
    questions.print();

    createMesurables(20);
    mesurables.print();

    createOneOnOnes(50);
    oneonones.print();

    createAnswer(50);
    answers_1.print();
}