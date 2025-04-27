#include <bits/stdc++.h>
#include "templateHoliday.h"
#include "usedHoliday.h"
#include "privileges.h"
#include "roles.h"
#include "rolePrivileges.h"
#include "countries.h"
#include "users.h"
#include "enterprise.h"
#include "department.h"
#include "userDepartment.h"
#include "workstatus.h"
#include "question.h"
#include "mesurable.h"
#include "oneonone.h"
#include "answer.h"
#include "measure.h"
#include "vacations.h"
#include "absence.h"
#include "absenceMedia.h"
#include "fault.h"
#include "faultMedia.h"
//#include "kpi.h"
//#include "evidence.h"
//#include "evidenceMedia.h"

using namespace std;

int main() {

    srand (time(NULL));

    freopen("addData.sql", "w", stdout);  // Pasa el output a un archivo
    
    createTemplateHoliday();

    createUsedHolidays();

    createPrivileges();
    for(auto i:privileges) i.print();

    createRoles();
    for(auto i:roles) i.print();

    createRolePrivileges();
    rolePrivileges.print();

    createCountries();
    countries.print();
    
    createEnterprise();

    createDepartment();

    createUsers(100);
    users.print();

    createUserDepartment();
    selectUserPriorityDepartment();

    createUsedWorkStatus(60);
    WorkStatus1.print();

    createQuestions(4);
    questions.print();

    createMesurables(5);
    mesurables.print();

    createOneOnOnes(70);
    oneonones.print();

    createAnswer(150);
    answers_1.print();

    createMesures(150);
    measures.print();

    createVacations(60);
    vacations.print();
    
    createAbsence(70);
    absence.print();
    
    createAbsenceMedia(50);
    absenceMedia.print();

    createFaults(50);
    faults.print();

    createFaultMedia(50);
    faultMedia.print();

    /*
    createKpi(50);
    kpi.print();

    createEvidence(50);
    evidence.print();

    createEvidenceMedia(70);
    evidenceMedia.print(); 
    */
}