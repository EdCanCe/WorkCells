#ifndef MEASURE_H
#define MEASURE_H

#include "random.h" // Documento para generar elementos aleatorios
#include "oneonone.h" // Documento para definir la estructura de un oneonone
#include "mesurable.h" // Documento para definir la estructura de una preguntas
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<int> evaluation_data = {1, 2, 3, 4, 5};

// Defino la clase que voy a usar
class Measure {
    private:
        int evaluation;
        int measureOneOnOneIDFK; // ID del One On One
        int measurableIDFK; // ID del Medible/Mesurable

    public:
        Measure(int, int, int);
        int getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<Measure> measures;

// Constructor de una tupla
Measure::Measure(int evaluation_, int measureOneOnOneIDFK_, int measurableIDFK_) {
    evaluation = evaluation_;
    measureOneOnOneIDFK = measureOneOnOneIDFK_;
    measurableIDFK = measurableIDFK_;
}

// Impresión / Código en SQL
void Measure::print() {
    cout << "INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(" << evaluation << ", " << measureOneOnOneIDFK << ", " << measurableIDFK << ");\n";
}

// Función para crear la tabla con X registros
void createMesures(int x){
    for(int i=0; i<x; i++){
        measures.add(Measure(evaluation_data.random(), oneonones.random().getId(), mesurables.random().getId()));
    }
}


#endif