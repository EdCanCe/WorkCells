#ifndef USERDEPARTMENT_H
#define USERDEPARTMENT_H

#include "random.h"
#include "department.h"
#include "users.h"

using namespace std;

class UserDepartment {
    private:
        int idDepartment;
        int idUser;
    
    public:
        UserDepartment(int, int);
        string getId();
        void print();
        
};

map<int, Randomizer<int>> auxLink;
        
Randomizer<UserDepartment> userDepartment;

UserDepartment::UserDepartment(int idDepartment, int idUser) {
    this->idDepartment = idDepartment;
    this->idUser = idUser;

    auxLink[idUser].add(idDepartment);
}

void UserDepartment::print() {
    cout << "INSERT INTO userDepartment(departmentIDFK, userIDFK) values (" << idDepartment << ", " << idUser << "); \n";
}

void createUserDepartment(int x) {
    for (int i = 0; i < x; i++) {
        userDepartment.add(UserDepartment(department.random().getID(), users.random().getId()));
    }
}

void selectUserPriorityDepartment(){
    for(int i = 0; i < users.size(); i++){
        if(!auxLink[i].size() == 0){
            cout << "UPDATE user SET prioritaryDepartmentFK = " << auxLink[i].random() << " WHERE userID = " << i+1 << "; \n";
        }
    }
}

#endif
