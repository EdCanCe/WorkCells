#ifndef VACATIONS_H
#define VACATIONS_H

#include "random.h"
#include "users.h"
using namespace std;

class Vacations {
    private:
        int id;
        bool leaderStatus;
        string reason;
        bool hrStatus;
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
    cout << "INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('" << "','" << startDate << "','" << endDate << "','" << reason << "','" << leaderStatus << "','" <<  hrStatus << "','" << users.random().getId() << "');\n";
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
    "03/01/2025",
    "06/02/2025",
    "08/03/2025",
    "11/04/2025",
    "14/05/2025",
    "17/06/2025",
    "19/07/2025",
    "22/08/2025",
    "25/09/2025",
    "27/10/2025",
    "04/12/2025",
    "07/01/2026",
    "09/02/2026",
    "12/03/2026",
    "15/04/2026",
    "18/05/2026",
    "21/06/2026",
    "23/07/2026",
    "26/08/2026",
    "29/09/2026",
    "03/11/2026",
    "06/12/2026",
    "09/01/2027",
    "12/02/2027",
    "15/03/2027",
    "18/04/2027",
    "21/05/2027",
    "24/06/2027",
    "27/07/2027",
    "30/08/2027",
    "03/10/2027",
    "06/11/2027",
    "09/12/2027",
    "12/01/2028",
    "15/02/2028",
    "18/03/2028",
    "21/04/2028",
    "24/05/2028",
    "27/06/2028",
    "30/07/2028",
    "03/09/2028",
    "06/10/2028",
    "09/11/2028",
    "12/12/2028",
    "15/01/2029",
    "18/02/2029",
    "21/03/2029",
    "24/04/2029",
    "27/05/2029",
    "30/06/2029",
    "03/08/2029",
    "06/09/2029",
    "09/10/2029",
    "12/11/2029",
    "15/12/2029",
    "18/01/2030",
    "21/02/2030",
    "24/03/2030",
    "27/04/2030",
    "30/05/2030",
    "03/07/2030",
    "06/08/2030",
    "09/09/2030",
    "12/10/2030",
    "15/11/2030",
    "18/12/2030",
    "21/01/2031",
    "24/02/2031",
    "27/03/2031",
    "30/04/2031",
    "03/06/2031",
    "06/07/2031",
    "09/08/2031",
    "12/09/2031",
    "15/10/2031",
    "18/11/2031",
    "21/12/2031",
    "24/01/2032",
    "27/02/2032",
    "30/03/2032",
    "03/05/2032",
    "06/06/2032",
    "09/07/2032",
    "12/08/2032",
    "15/09/2032",
    "18/10/2032",
    "21/11/2032",
    "24/12/2032",
    "27/01/2033",
    "30/02/2033",
    "03/04/2033",
    "06/05/2033",
    "09/06/2033",
    "12/07/2033",
    "15/08/2033",
    "18/09/2033",
    "21/10/2033",
    "24/11/2033",
    "27/12/2033"
};

string createEndDate(const std::string& fecha) {
    std::string dia = fecha.substr(0, 2);
    std::string mes = fecha.substr(3, 2);
    std::string anio = fecha.substr(6, 4);
    
    int diaInt = std::stoi(dia);
    diaInt++; // Sumar 1 al día
    
    // Formatear el nuevo día con dos dígitos
    if (diaInt < 10) {
        dia = "0" + std::to_string(diaInt);
    } else {
        dia = std::to_string(diaInt);
    }
    
    return dia + "/" + mes + "/" + anio;
}

void createVacations(int x){
    for(int i=0; i<x; i++){
        string start_date = startDate.random();
        vacations.add(Vacations(leaderStatus.random(), reason.random(), hrStatus.random(), start_date, createEndDate(start_date)));
    }
}

#endif