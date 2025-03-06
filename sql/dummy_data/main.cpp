#include <bits/stdc++.h>
#include "privileges.h"
#include "roles.h"
#include "rolePrivileges.h"
#include "countries.h"
#include "users.h"
#include "enterprise.h"
#include "department.h"
#include "userDepartment.h"
#include "templateHoliday.h"
#include "usedHoliday.h"
#include "workstatus.h"
#include "question.h"
#include "mesurable.h"
#include "oneonone.h"
#include "answer.h"
#include "measure.h"
#include "fault.h"

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
    
    createTemplateHolidays(20);
    templateHolidays.print();

    createUsedHolidays(50);
    usedHolidays.print();

    createUsedWorkStatus(50);
    WorkStatus1.print();
    createQuestions(10);
    questions.print();

    createMesurables(20);
    mesurables.print();

    createOneOnOnes(50);
    oneonones.print();

    createAnswer(50);
    answers_1.print();

    createMesures(50);
    measures.print();

    createFaults(20);
    faults.print();
}