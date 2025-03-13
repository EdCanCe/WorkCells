#ifndef WORKSTATUS_H
#define WORKSTATUS_H

#include "random.h"
#include "users.h"
using namespace std;

Randomizer<string> start_date = {
    "2026-01-02", // Aniversario empresa
    "1910-11-20", // Revolución
    "1920-09-15", // Independencia
    "2000-01-07", // Día de Reyes
    "1917-02-05", // Día de la Constitución
    "1806-03-21", // Natalicio de Benito Juárez
    "2026-04-02", // Semana Santa (Viernes Santo)
    "1886-05-01", // Día del Trabajo
    "2026-05-10", // Día de la Madre
    "2026-06-16", // Día del Padre
    "1934-02-24", // Día de la Bandera
    "2026-11-02", // Día de Muertos
    "2026-12-25", // Navidad
    "1531-12-12", // Día de la Virgen de Guadalupe
    "2026-02-19", // Día del Ejército
    "2026-08-28", // Día de los Abuelos
    "2026-05-15", // Día del Maestro
    "2026-04-30", // Día del Niño
    "2026-05-23", // Día del Estudiante
    "2026-03-08", // Día Internacional de la Mujer
    "2026-02-14", // Día del Amor y la Amistad
    "2026-06-05", // Día Mundial del Medio Ambiente
    "2026-10-12", // Día de la Raza
    "2026-04-07", // Día Mundial de la Salud
    "2026-08-22", // Día del Bombero
    "2026-06-02", // Día del Policía
    "2026-10-01", // Día del Arquitecto
    "2026-09-21"  // Día Internacional de la Paz
};

// Lista de fechas utilizadas
Randomizer<string> end_date = {
    "2026-01-02", // Aniversario empresa
    "1910-11-20", // Revolución
    "1920-09-15", // Independencia
    "2000-01-07", // Día de Reyes
    "1917-02-05", // Día de la Constitución
    "1806-03-21", // Natalicio de Benito Juárez
    "2026-04-02", // Semana Santa (Viernes Santo)
    "1886-05-01", // Día del Trabajo
    "2026-05-10", // Día de la Madre
    "2026-06-16", // Día del Padre
    "1934-02-24", // Día de la Bandera
    "2026-11-02", // Día de Muertos
    "2026-12-25", // Navidad
    "1531-12-12", // Día de la Virgen de Guadalupe
    "2026-02-19", // Día del Ejército
    "2026-08-28", // Día de los Abuelos
    "2026-05-15", // Día del Maestro
    "2026-04-30", // Día del Niño
    "2026-05-23", // Día del Estudiante
    "2026-03-08", // Día Internacional de la Mujer
    "2026-02-14", // Día del Amor y la Amistad
    "2026-06-05", // Día Mundial del Medio Ambiente
    "2026-10-12", // Día de la Raza
    "2026-04-07", // Día Mundial de la Salud
    "2026-08-22", // Día del Bombero
    "2026-06-02", // Día del Policía
    "2026-10-01", // Día del Arquitecto
    "2026-09-21"  // Día Internacional de la Paz
};


// Clase para los días festivos utilizados
class WorkStatus {
private:
    string workStatusID;
    string start_date;
    string end_date;
    string userStatusIDFK;

public:
    WorkStatus(string,string,string);
    string getId();
    void print();
};

// Randomizador de días festivos utilizados
Randomizer<WorkStatus> WorkStatus1;

WorkStatus::WorkStatus(string _start_date, string _end_date,string _userStatusIDFK){
    workStatusID = generateUUID();
    start_date = _start_date;
    end_date = _end_date;
    userStatusIDFK = _userStatusIDFK;
}

string WorkStatus::getId() {
    return workStatusID;
}

void WorkStatus:: print() {
    cout << "INSERT INTO workStatus(workStatusID, startDate,endDate, userStatusIDFK) VALUES('" << workStatusID << "', '" << start_date << "', " << "'"<< end_date << "', '"<< userStatusIDFK << "'); \n";
}

// Función para crear registros de días festivos utilizados
void createUsedWorkStatus(int x) {
    for (int i = 0; i < x; i++) {
        WorkStatus1.add(WorkStatus(start_date.random(),end_date.random(), users.random().getId()));
    }
}

#endif
