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

// Función para crear la tabla con X registros
void createRolePrivileges(int x){
    for(int i=0; i<x; i++){
        rolePrivileges.add(RolePrivilege(roles.random().getId(), privileges.random().getId()));
    }
}


#endif