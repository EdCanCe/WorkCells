#ifndef USERDEPARTMENT_H
#define USERDEPARTMENT_H

#include "random.h"
#include "department.h"
#include "users.h"

using namespace std;

class UserDepartment {
    private:
        string idDepartment;
        string idUser;
    
    public:
        UserDepartment(string, string);
        string getId();
        string getDepartmentID();
        string getUserID();
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

string UserDepartment::getDepartmentID() {
    return this->idDepartment;
}

string UserDepartment::getUserID() {
    return this->idUser;
}

void createUserDepartment() {
    for (int i = 0; i < users.size(); i++) {
        UserDepartment aux = UserDepartment(department.random().getId(), users.get(i).getId());
        userDepartment.add(aux);
        if(users.get(i).getRole() == "Department Leader") {
            cout << "UPDATE department SET departmentLeaderIDFK = '" << aux.getUserID() << "' WHERE departmentID = '" << aux.getDepartmentID() << "'; \n";
        }
    }
}

void selectUserPriorityDepartment(){
    for(int i = 0; i < users.size(); i++){
        if(!auxLink[userIds[i]].size() == 0){
            cout << "UPDATE user SET prioritaryDepartmentIDFK = '" << auxLink[userIds[i]].random() << "' WHERE userID = '" << userIds[i] << "'; \n";
        }
    }
}

#endif