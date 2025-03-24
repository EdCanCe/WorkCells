#ifndef DEPARTMENT_H
#define DEPARTMENT_H

#include "random.h"
#include "enterprise.h"

using namespace std;

Randomizer<string> Dtitle {
    "RRHH",
    "Finanzas",
    "Ventas",
    "Marketing",
    "Producción",
    "Logística",
    "Atencion al cliene",
    "Legal",
    "TI"
};

class Department {
    private:
        string idDepartment;
        string idEnterprise;
        string title;

    public:
        Department(string, string);
        string getId();
        void print();
};

Randomizer<Department> department;

string Department::getId(){
    return idDepartment;
}

Department::Department(string idEnterprise, string title) {
    this->idDepartment = generateUUID();
    this->idEnterprise = idEnterprise;
    this->title = title;
}

void Department::print() {
    cout << "INSERT INTO department(departmentID, enterpriseIDFK, title) values('" << idDepartment << "', '" << idEnterprise << "', '" << title << "'); \n";
}

void createDepartment(int x) {
    for (int i = 0; i < x; i++) {
        department.add(Department(enterprise.random().getId(), Dtitle.random()));
    }
    
}



#endif