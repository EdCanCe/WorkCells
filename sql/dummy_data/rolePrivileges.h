#ifndef ROLEPRIVILEGE_h
#define ROLEPRIVILEGE_h

#include "random.h"
#include "privileges.h"
#include "roles.h"
using namespace std;

class RolePrivilege {
    private:
        string idRole;
        string idPrivilege;

    public:
        RolePrivilege(string, string);
        void print();
};

Randomizer<RolePrivilege> rolePrivileges;

RolePrivilege::RolePrivilege(string IdRole, string IdPrivilege) {
    idRole = IdRole;
    idPrivilege = IdPrivilege;
}

// Impresión / Código en SQL
void RolePrivilege::print() {
    cout << "INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('" << idRole << "', '" << idPrivilege << "'); \n";
}

void createRolePrivileges() {
    for(int i=0; i<13; i++) {
        rolePrivileges.add(RolePrivilege(roles[0].getId(), privileges[i].getId()));
    }

    for(int i=0; i<19; i++) {
        rolePrivileges.add(RolePrivilege(roles[1].getId(), privileges[i].getId()));
    }

    for(int i=0; i<privileges.size(); i++) {
        rolePrivileges.add(RolePrivilege(roles[2].getId(), privileges[i].getId()));
    }
}


#endif