#ifndef VACATIONS_H
#define VACATIONS_H

#include "random.h"
#include "users.h"
using namespace std;

class Vacations {
    private:
        int id;
        bool leaderStatus;
        bool hrStatus;
        string reason;
        string startDate;
        string endDate;
    public:
        Vacations(
            bool leaderStatus,
            string reason,
            bool hrStatus,
            string startDate,
            string endDate
        );
        int getId();
        void print();
};

Randomizer<Vacations> vacations;

Vacations::Vacations(bool LeaderStatus, string Reason, bool HrStatus, string StartDate, string EndDate) {
    id = vacations.size() + 1;
    leaderStatus = LeaderStatus;
    reason = Reason;
    hrStatus = HrStatus;
    startDate = StartDate;
    endDate = EndDate;
    
};

int Vacations::getId(){
    return id;
};

void Vacations::print() {
    cout << "INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('" << startDate << "','" << endDate << "','" << reason << "'," << leaderStatus << "," <<  hrStatus << "," << users.random().getId() << ");\n";
};

Randomizer<bool> leaderStatus = {
    true,
    false
};

Randomizer<string> reason = {
    "Descansar del trabajo",
    "Reducir el estrés",
    "Conocer nuevos lugares",
    "Explorar diferentes culturas",
    "Disfrutar de la naturaleza",
    "Pasar tiempo con la familia",
    "Fortalecer la relación de pareja",
    "Celebrar un aniversario",
    "Festejar un cumpleaños",
    "Realizar actividades al aire libre",
    "Visitar amigos o familiares",
    "Probar nuevas comidas",
    "Recargar energía y motivación",
    "Desconectarse de la rutina",
    "Mejorar la salud mental",
    "Practicar deportes extremos",
    "Aprender un nuevo idioma",
    "Aprovechar promociones de viaje",
    "Cumplir un sueño personal",
    "Tomar fotos y crear recuerdos"
};

Randomizer<bool> hrStatus {
    true,
    false
};

Randomizer<string> startDate {
    "03/01/25",
    "06/02/25",
    "08/03/25",
    "11/04/25",
    "14/05/25",
    "17/06/25",
    "19/07/25",
    "22/08/25",
    "25/09/25",
    "27/10/25",
    "04/12/25",
    "07/01/26",
    "09/02/26",
    "12/03/26",
    "15/04/26",
    "18/05/26",
    "21/06/26",
    "23/07/26",
    "26/08/26",
    "29/09/26",
    "03/11/26",
    "06/12/26",
    "09/01/27",
    "12/02/27",
    "15/03/27",
    "18/04/27",
    "21/05/27",
    "24/06/27",
    "27/07/27",
    "30/08/27",
    "03/10/27",
    "06/11/27",
    "09/12/27",
    "12/01/28",
    "15/02/28",
    "18/03/28",
    "21/04/28",
    "24/05/28",
    "27/06/28",
    "30/07/28",
    "03/09/28",
    "06/10/28",
    "09/11/28",
    "12/12/28",
    "15/01/29",
    "18/02/29",
    "21/03/29",
    "24/04/29",
    "27/05/29",
    "30/06/29",
    "03/08/29",
    "06/09/29",
    "09/10/29",
    "12/11/29",
    "15/12/29",
    "18/01/30",
    "21/02/30",
    "24/03/30",
    "27/04/30",
    "30/05/30",
    "03/07/30",
    "06/08/30",
    "09/09/30",
    "12/10/30",
    "15/11/30",
    "18/12/30",
    "21/01/31",
    "24/02/31",
    "27/03/31",
    "30/04/31",
    "03/06/31",
    "06/07/31",
    "09/08/31",
    "12/09/31",
    "15/10/31",
    "18/11/31",
    "21/12/31",
    "24/01/32",
    "27/02/32",
    "30/03/32",
    "03/05/32",
    "06/06/32",
    "09/07/32",
    "12/08/32",
    "15/09/32",
    "18/10/32",
    "21/11/32",
    "24/12/32",
    "27/01/33",
    "30/02/33",
    "03/04/33",
    "06/05/33",
    "09/06/33",
    "12/07/33",
    "15/08/33",
    "18/09/33",
    "21/10/33",
    "24/11/33",
    "27/12/33"
};

string createEndDate(string& fecha) {
    string dia = fecha.substr(0, 2);
    string mes = fecha.substr(3, 2);
    string anio = fecha.substr(6, 2);
    
    int diaInt = stoi(dia);
    diaInt++; // Sumar 1 al día
    
    // Formatear el nuevo día con dos dígitos
    if (diaInt < 10) {
        dia = "0" + to_string(diaInt);
    } else {
        dia = to_string(diaInt);
    }
    
    return anio + "/" + mes + "/" + dia;
}

void createVacations(int x){
    for(int i=0; i<x; i++){
        string start_date = startDate.random();
        vacations.add(Vacations(leaderStatus.random(), reason.random(), hrStatus.random(), start_date, createEndDate(start_date)));
    }
}

#endif