#ifndef ETEMPLATE_H
#define ETEMPLATE_H

#include "random.h" // Documento para generar elementos aleatorios
using namespace std;

// Defino la clase que voy a usar
class Role {
    private:
        int id;
        string title;

    public:
        Role(string);
        int getId();
        void print();
};

// Creo un vector de dicha clase para usarla en un futuro
Randomizer<Role> roles;

// Constructor de una tupla
Role::Role(string Title) {
    id = roles.size();
    title = Title;
}

// Impresión / Código en SQL
void Role::print() {
    cout << "INSERT INTO role(title) values('" << title << "'); \n";
}

// Función para crear la tabla con X registros
void createRoles(){
    roles.add(Role("Colaborator"));
    roles.add(Role("Department Leader"));
    roles.add(Role("Human Resources"));
}


#endif