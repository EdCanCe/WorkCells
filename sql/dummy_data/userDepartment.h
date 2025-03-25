#ifndef USERDEPARTMENT_H
#define USERDEPARTMENT_H

#include "random.h"
#include "department.h"
#include "users.h"
#include <map>


using namespace std;

class UserDepartment {
    private:
        string idDepartment;
        string idUser;
    
    public:
        UserDepartment(string, string);
        string getId();
        void print();
        
};

map<string, Randomizer<string>> auxLink;
        
Randomizer<UserDepartment> userDepartment;

UserDepartment::UserDepartment(string idDepartment, string idUser) {
    this->idDepartment = idDepartment;
    this->idUser = idUser;

    auxLink[idUser].add(idDepartment);
}

void UserDepartment::print() {
    cout << "INSERT INTO userDepartment(departmentIDFK, userIDFK) values ('" << idDepartment << "', '" << idUser << "'); \n";
}

void createUserDepartment(int x) {
    for (int i = 0; i < x; i++) {
        userDepartment.add(UserDepartment(department.random().getId(), users.random().getId()));
    }
}

void selectUserPriorityDepartment(){
    for(int i = 0; i < users.size(); i++){
        if(auxLink[userIds[i]].size() != 0){
            cout << "UPDATE user SET prioritaryDepartmentFK = '" << auxLink[userIds[i]].random() << "' WHERE userID = '" << userIds[i] << "'; \n";
        }
    }
}

#endif