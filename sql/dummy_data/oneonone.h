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
        int id;
        int expectedTime;
        string meetingDate;
        int oneOnOneUserIDFK;

    public:
        OneOnOne(int, string, int);
        int getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<OneOnOne> oneonones;

// Constructor de una tupla
OneOnOne::OneOnOne(int expectedTime_, string meetingDate_, int oneOnOneUserIDFK_) {
    id = oneonones.size() + 1;
    expectedTime = expectedTime_;
    meetingDate = meetingDate_;
    oneOnOneUserIDFK = oneOnOneUserIDFK_;
}

// Obtengo su Id
int OneOnOne::getId(){
    return id;
}

// Impresión / Código en SQL
void OneOnOne::print() {
    cout << "INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(" << expectedTime << ", '" << meetingDate << "', " << oneOnOneUserIDFK << ");\n";
}

// Función para crear la tabla con X registros
void createOneOnOnes(int x){
    for(int i=0; i<x; i++){
        oneonones.add(OneOnOne(expectedTime.random(), meetingDate.random(), users.random().getId()));
    }
}


#endif