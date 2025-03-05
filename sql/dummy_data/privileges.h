#ifndef PRIVILEGES_H
#define PRIVILEGES_H

#include "random.h" // Documento para generar elementos aleatorios
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> privilegeTitle = {
"User A does this",
"User B does this other thing",
"And user C does this",
"While user D still does this"
};

Randomizer<string> privilegeSummary = {
"This is a privilege",
"This is another privilege",
"Another privilege more??"
};

// Defino la clase que voy a usar
class Privilege {
    private:
        int id;
        string title;
        string summary;

    public:
        Privilege(string, string);
        int getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<Privilege> privileges;

// Constructor de una tupla
Privilege::Privilege(string Title, string Summary) {
    id = privileges.size() + 1;
    title = Title;
    summary = Summary;
}

// Obtengo su Id
int Privilege::getId(){
    return id;
}

// Impresión / Código en SQL
void Privilege::print() {
    cout << "INSERT INTO privilege(title, summary) values('" << title << "', '" << summary << "'); \n";
    // ! No olvidar comillas ' ' para datos string. Ni ; al final de línea
}

// Función para crear la tabla con X registros
void createPrivileges(int x){
    for(int i=0; i<x; i++){
        privileges.add(Privilege(privilegeTitle.random(), privilegeSummary.random()));
    }
}


#endif