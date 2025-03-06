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
        int idDepartment;
        int idEnterprise;
        string title;

    public:
        Department(int, string);
        int getID();
        void print();
};

Randomizer<Department> department;

int Department::getID(){
    return idDepartment;
}

Department::Department(int idEnterprise, string title) {
    this->idDepartment = department.size() + 1;
    this->idEnterprise = idEnterprise;
    this->title = title;
}

void Department::print() {
    cout << "INSERT INTO department(enterpriseIDFK, title) values(" << idDepartment << "," << idEnterprise << "); \n";
}

void createDepartment(int x) {
    for (int i = 0; i < x; i++) {
        department.add(Department(enterprise.random().getID(), title.random()));
    }
    
}



#endif