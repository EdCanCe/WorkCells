#ifndef ABSENCE_H
#define ABSENCE_H

#include "random.h"
#include "vacations.h"
#include "users.h"

using namespace std;

class Absence {
    private:
        string id;
        string reason;
        string startDate;
        string endDate;
        bool justified;
    public:
        Absence( string reason,
            string startDate,
            string endDate,
            int justified);
        string getId();
        void print();
};

Randomizer<Absence> absence;

Absence::Absence(string reason, string startDate, string endDate, int justified) {
    id = absence.size() + 1;
    this->reason = reason;
    this->startDate = startDate;
    this->endDate = endDate;
    this->justified = justified;
}

int Absence::getID(){
    return id;
}

void Absence::print(){
    cout << "INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('" << reason << "', '" << startDate << "', '" << endDate << "', " << justified << ", " << users.random().getId() << "); \n";
};


Randomizer<string> reasonA {
    "Enfermedad",
    "Consulta médica",
    "Accidente",
    "Luto por fallecimiento de un familiar",
    "Problemas familiares",
    "Cuidado de un hijo o familiar enfermo",
    "Maternidad/Paternidad",
    "Licencia por matrimonio",
    "Vacaciones programadas",
    "Trámites administrativos o legales",
    "Citación judicial",
    "Emergencia en el hogar (fugas, incendios, etc.)",
    "Condiciones climáticas extremas",
    "Huelga de transporte",
    "Capacitación o curso obligatorio",
    "Viaje de emergencia",
    "Problemas de salud mental",
    "Donación de sangre",
    "Problemas de movilidad o avería del vehículo",
    "Convocatoria a servicio militar o cívico"
};


// Randomizer<string> endDate{};


Randomizer<int> justified{
    0,
    1,
    2
};


void createAbsence(int x) {
    for (int i = 0; i < x; i++){
        string start_date = startDate.random();
        absence.add(Absence(reasonA.random(), changeFormat(start_date), createEndDate(start_date), justified.random()));
    }
}

#endif