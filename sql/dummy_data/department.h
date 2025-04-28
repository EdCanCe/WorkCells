#ifndef DEPARTMENT_H
#define DEPARTMENT_H

#include "random.h"
#include "enterprise.h"

using namespace std;

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

vector<Department> department;

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

void createDepartment() {
    department.push_back(Department(enterprise[0].getId(), "Backend"));
    department.push_back(Department(enterprise[0].getId(), "Frontend"));
    department.push_back(Department(enterprise[0].getId(), "UX/UI"));
    department.push_back(Department(enterprise[0].getId(), "Design"));
    department.push_back(Department(enterprise[0].getId(), "BAM"));
    department.push_back(Department(enterprise[0].getId(), "Robotics"));

    department.push_back(Department(enterprise[1].getId(), "Copywritting"));
    department.push_back(Department(enterprise[1].getId(), "Design"));
    department.push_back(Department(enterprise[1].getId(), "Motion Graphics"));

    department.push_back(Department(enterprise[2].getId(), "Customer Success"));
    department.push_back(Department(enterprise[2].getId(), "Design"));
    department.push_back(Department(enterprise[2].getId(), "Sales"));

    department.push_back(Department(enterprise[3].getId(), "Devops"));
    department.push_back(Department(enterprise[3].getId(), "Backend"));
    department.push_back(Department(enterprise[3].getId(), "Blockchain Dev"));
    department.push_back(Department(enterprise[3].getId(), "Comms"));

    department.push_back(Department(enterprise[4].getId(), "QA"));
    department.push_back(Department(enterprise[4].getId(), "Devops"));
    department.push_back(Department(enterprise[4].getId(), "UX/UI"));
    department.push_back(Department(enterprise[4].getId(), "Backend"));
    department.push_back(Department(enterprise[4].getId(), "Frontend"));
    department.push_back(Department(enterprise[4].getId(), "Comms"));

    department.push_back(Department(enterprise[5].getId(), "HR"));
    department.push_back(Department(enterprise[5].getId(), "Admin"));
    department.push_back(Department(enterprise[5].getId(), "DS"));

    for (auto i:department) {
        i.print();
    }
}



#endif