#ifndef ROLEPRIVILEGE_h
#define ROLEPRIVILEGE_h

#include "random.h"
#include "privileges.h"
#include "roles.h"
using namespace std;

class RolePrivilege {
    private:
        int idRole;
        int idPrivilege;

    public:
        RolePrivilege(int, int);
        void print();
};

Randomizer<RolePrivilege> rolePrivileges;

RolePrivilege::RolePrivilege(int IdRole, int IdPrivilege) {
    idRole = IdRole;
    idPrivilege = IdPrivilege;
}

// Impresión / Código en SQL
void RolePrivilege::print() {
    cout << "INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(" << idRole << ", " << idPrivilege << "); \n";
}

void createRolePrivileges() {
    for(int i=0; i<15; i++) {
        rolePrivileges.add(RolePrivilege(1, i+1));
    }

    for(int i=0; i<25; i++) {
        rolePrivileges.add(RolePrivilege(2, i+1));
    }

    for(int i=0; i<50; i++) {
        rolePrivileges.add(RolePrivilege(3, i+1));
    }
}


#endif