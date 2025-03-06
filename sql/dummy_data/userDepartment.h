#ifndef USERDEPARTMENT_H
#define USERDEPARTMENT_H

#include "random.h"
#include "department.h"
#include "users.h"

using namespace std;

class UserDepartment {
    private:
        bool isPriority;
        int idDepartment;
        int idUser;
    
    public:
        UserDepartment(bool, int, int);
        int getID();
        void print();
};



#endif
