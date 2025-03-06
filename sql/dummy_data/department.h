#ifndef DEPARTMENT_H
#define DEPARTMENT_H

#include "random.h"
#include "enterprise.h"

using namespace std;

Randomizer<string> title {
    "RRHH",
    "Finanzas",
    "Ventas",
    "Marketing",
    "Producción",
    "Logística",
    "Atencion al cliene",
    "Legal",
    "TI"
}

class Department {
    private:
        int idDepartment;
        int idEnterprise;
        string title;

    public:
        Department(int, int, string);
        void print();
};

Randomizer<Department> department;

Department::department(int idDepartment, int idEnterprise, string title) {
    this->idDepartment = idDepartment;
    this->idEnterprise = idEnterprise;
    this->title = title;
}

void Department::print() {
    cout << "INSERT INTO department(departmentIDFK, tittle) values(" << idDepartment << "," << idEnterprise << "); \n"
}

void createDepartment(int x) {
    for (int i = 0; i < x; i++) {
        department.add(Department(enterprise.random().getID(), ))
    }
    
}



#endif