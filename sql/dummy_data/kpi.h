#ifndef KPI_H
#define KPI_H

#include "random.h"
#include "department.h"
#include "users.h"

using namespace std;

Randomizer<string> Ktitle {
    "Tasa de Crecimiento Mensual",
    "Retorno sobre la Inversión",
    "Nivel de Satisfacción del Cliente",
    "Tiempo de Respuesta Promedio",
    "Eficiencia Operativa Global"
};

Randomizer<string> creationDate {
    "10/03/25",
    "17/03/25",
    "18/03/25",
    "25/03/25",
    "26/03/25",
    "02/04/25",
    "03/04/25",
    "07/04/25",
    "08/04/25",
    "15/04/25"
};

Randomizer<string> goal {
    "Aumentar la Tasa de Crecimiento Mensual en un 10 porciento en el próximo trimestre.",
    "Mejorar el Retorno sobre la Inversión (ROI) en un 15 porciento al optimizar campañas.",
    "Elevar el Nivel de Satisfacción del Cliente (CSAT) al 90 porciento en seis meses.",
    "Reducir el Tiempo de Respuesta Promedio a menos de 2 horas.",
    "Aumentar la Eficiencia Operativa Global en un 20 porciento mediante automatización.",
    "Mantener un crecimiento mensual sostenido por encima del 8 porciento.",
    "Disminuir costos operativos para mejorar el ROI sin afectar la calidad."
};

class Kpi {
    private:
        int id;
        string title;
        string creationDate;
        int progress;
        string goal;
        int monthDuration;
        int idDepartment;
        int idUser;

    public:
        Kpi(string, string, int, string, int, int, int);
        int getID();
        void print();
};

Randomizer<Kpi> kpi;

Kpi::Kpi(string title, string creationDate, int progress, string goal, int monthDuration, int idDepartment,  int idUser) {
    id = enterprise.size() + 1;
    this->title = title;
    this->creationDate = creationDate;
    this->progress = progress;
    this->goal = goal;
    this->monthDuration = monthDuration;
    this->idDepartment = idDepartment;
    this->idUser = idUser;
}

int Kpi::getID(){
    return id;
}

void Kpi::print() {
    cout << "INSERT INTO kpi(title, creationDate, progress, goal, monthDuration, idDepartment, idUser) values('" << 
    title << ", " << creationDate << ", " << progress << ", " << goal << ", " << monthDuration << ", " << idDepartment << ", " << 
    idUser << "');  \n";
};

void createKpi(int x) {
    for (int i = 0; i < x; i++) {
        kpi.add(Kpi(title.random(), creationDate.random(), 1 + getRandom(5), goal.random(), 1 + getRandom(12), department.random().getID(), users.random().getId()));
    }
    
}

#endif