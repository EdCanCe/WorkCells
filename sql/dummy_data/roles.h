#ifndef ETEMPLATE_H
#define ETEMPLATE_H

#include "random.h"
using namespace std;

class Role {
    private:
        int id;
        string title;

    public:
        Role(string);
        int getId();
        void print();
};

Randomizer<Role> roles;

Role::Role(string Title) {
    id = roles.size() + 1;
    title = Title;
}

int Role::getId(){
    return id;
}

void Role::print() {
    cout << "INSERT INTO role(title) values('" << title << "'); \n";
}

void createRoles(){
    roles.add(Role("Colaborator"));
    roles.add(Role("Department Leader"));
    roles.add(Role("Human Resources"));
}

#endif