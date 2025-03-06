#ifndef EVIDENCE_H
#define EVIDENCE_H

#include "random.h"
#include "kpi.h"

using namespace std;

Randomizer<string> summary {
    "Tasa de Crecimiento Mensual (TCM): Medir el aumento porcentual de ingresos o usuarios mes a mes para evaluar el ritmo de expansión.",
    "Retorno sobre la Inversión (ROI): Evaluar la rentabilidad de las inversiones realizadas.",
    "Nivel de Satisfacción del Cliente (CSAT): Medir la satisfacción del cliente mediante encuestas para mejorar servicios.",
    "Tiempo de Respuesta Promedio (TRP): Monitorear el tiempo promedio de respuesta para mejorar la atención al cliente.",
    "Eficiencia Operativa Global (EOG): Evaluar la productividad y eficiencia de las operaciones para optimizar procesos."
};

Randomizer<string> uploadDate {
    "15/03/25",
    "22/03/25",
    "30/03/25",
    "05/04/25",
    "12/04/25"
};

class Evidence {
    private:
        int id;
        string summary;
        string uploadDate;
        int idKpi;
    public:
        Evidence(string, string, int);
        int getID();
        void print();
};

Randomizer<Evidence> evidence;

Evidence::Evidence(string summary, string uploadDate, int idKpi) {
    id = evidence.size() + 1;
    this->summary = summary;
    this->uploadDate = uploadDate;
    this->idKpi = idKpi;
}

int Evidence::getID(){
    return id;
}

void Evidence::print(){
    cout << "INSERT INTO evidence(summary, uploadDate, evidenceKpiIDFK) values('" << summary << "', '" << uploadDate << "', " << idKpi << "); \n";
};

void createEvidence(int x) {
    for (int i = 0; i < x; i++){
        evidence.add(Evidence(summary.random(), uploadDate.random(), kpi.random().getID()));
    }
}

#endif