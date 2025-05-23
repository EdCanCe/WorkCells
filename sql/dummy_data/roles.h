#ifndef ETEMPLATE_H
#define ETEMPLATE_H

#include "random.h"
using namespace std;

class Role {
    private:
        string id;
        string title;

    public:
        Role(string);
        string getId();
        string getTitle();
        void print();
};

vector<Role> roles;

Role::Role(string Title) {
    id = generateUUID();
    title = Title;
}

string Role::getId(){
    return id;
}

string Role::getTitle() {
    return title;
}

void Role::print() {
    cout << "INSERT INTO role(roleID, title) values('" << id << "', '" << title << "'); \n";
}

void createRoles(){
    roles.push_back(Role("Colaborator"));
    roles.push_back(Role("Department Leader"));
    roles.push_back(Role("Manager"));
}

#endif