#ifndef ONEONONE_H
#define ONEONONE_H

#include "random.h" // Documento para generar elementos aleatorios
#include "users.h" // Documento para definir la estructura de un usuario
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<int> expectedTime = {
15
};

Randomizer<string> meetingDate = {
    "2025-03-05 09:15:00", 
    "2025-03-05 09:30:00", 
    "2025-03-05 09:45:00",
    "2025-03-20 13:15:00",
    "2025-03-20 13:30:00",
    "2025-03-20 13:45:00",
    "2025-03-21 16:00:00",
    "2025-03-21 16:15:00",
    "2025-05-07 07:30:00",
    "2025-05-07 07:00:00",
    "2025-05-07 14:15:00",
    "2025-05-07 14:30:00",
    "2025-05-07 14:45:00",
    "2025-05-12 14:15:00",
    "2025-05-12 14:30:00",
    "2025-05-12 14:45:00"
};

// Defino la clase que voy a usar
class OneOnOne {
    private:
        string id;
        int expectedTime;
        string meetingDate;
        string oneOnOneUserIDFK;

    public:
        OneOnOne(int, string, string);
        string getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<OneOnOne> oneonones;

// Constructor de una tupla
OneOnOne::OneOnOne(int expectedTime_, string meetingDate_, string oneOnOneUserIDFK_) {
    id = generateUUID();
    expectedTime = expectedTime_;
    meetingDate = meetingDate_;
    oneOnOneUserIDFK = oneOnOneUserIDFK_;
}

// Obtengo su Id
string OneOnOne::getId(){
    return id;
}

// Impresión / Código en SQL
void OneOnOne::print() {
    cout << "INSERT INTO oneOnOne(oneOnOneID, expectedTime, meetingDate, oneOnOneUserIDFK) VALUES('" << id << "', " <<expectedTime << ", '" << meetingDate << "', '" << oneOnOneUserIDFK << "');\n";
}

// Función para crear la tabla con X registros
void createOneOnOnes(int x){
    for(int i=0; i<x; i++){
        oneonones.add(OneOnOne(expectedTime.random(), meetingDate.random(), users.random().getId()));
    }
}


#endif