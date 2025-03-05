#ifndef ETEMPLATE_H
#define ETEMPLATE_H

#include "random.h" // Documento para generar elementos aleatorios
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> names = {
"Juan",
"Pedro",
"Pablo",
"Enrique"
};

Randomizer<string> lastName = {
"López",
"García",
"Hernández",
"Franco",
"Marín"
};

// Defino la clase que voy a usar
class Entity {
    private:
        int id;
        string name;
        string fLastName;
        string mLastName;

    public:
        Entity(string, string, string);
        int getId();
        void print();
};

// Creo un vector de dicha clase para usarla en un futuro
Randomizer<Entity> entities;

// Constructor de una tupla
Entity::Entity(string Name, string FLastName, string MLastName) {
    id = entities.size();
    name = Name;
    fLastName = FLastName;
    mLastName = MLastName;
}

// Impresión / Código en SQL
void Entity::print() {
    cout << "INSERT INTO Entity(at1, at2, at3) values('" << name << "', '" << fLastName << "', '" << mLastName << "); \n";
    // ! No olvidar comillas ' ' para datos string. Ni ; al final de línea
}

// Función para crear la tabla con X registros
void createEntities(int x){
    for(int i=0; i<x; i++){
        entities.add(Entity(names.random(), lastName.random(), lastName.random()));
    }
}


#endif