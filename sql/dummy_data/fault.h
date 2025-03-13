#ifndef FAULT_H
#define FAULT_H

#include "random.h" // Documento para generar elementos aleatorios
#include "users.h" // Documento para usuarios
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> doneDate_data = {
    "2025-03-17", 
    "2025-03-17", 
    "2025-03-17",
    "2025-03-30",
    "2025-03-30",
    "2025-03-30",
    "2025-03-12",
    "2025-03-12",
    "2025-05-14",
    "2025-05-14",
    "2025-05-14",
    "2025-05-14",
    "2025-05-14",
    "2025-05-16",
    "2025-05-16",
    "2025-05-16"
};

Randomizer<string> summary_data = {
    "El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.", 
    "Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.", 
    "Incumplir con los plazos establecidos para la entrega de proyectos o tareas",
    "No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas",
    "Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente",
    "No seguir las políticas o procedimientos establecidos por la empresa"
};

// Defino la clase que voy a usar
class Fault {
    private:
        string id;
        string doneDate; 
        string summary;
        int faultUserIDFK;

    public:
        Fault(string, string, int);
        string getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<Fault> faults;

// Constructor de una tupla
Fault::Fault(string doneDate_, string summary_, int faultUserIDFK_) {
    id = faults.size() + 1;
    doneDate = doneDate_;
    summary = summary_;
    faultUserIDFK = faultUserIDFK_;
}

// Impresión / Código en SQL
void Fault::print() {
    cout << "INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('" << doneDate << "', '" << summary << "', " << faultUserIDFK << ");\n";
}

// Función para crear la tabla con X registros
void createFaults(int x){
    for(int i=0; i<x; i++){
        faults.add(Fault(doneDate_data.random(), summary_data.random(), users.random().getId()));
    }
}


#endif