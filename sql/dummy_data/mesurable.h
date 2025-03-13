#ifndef MESURABLE_H
#define MESURABLE_H

#include "random.h" // Documento para generar elementos aleatorios
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> summary = {
"Carga de trabajo: El colaborador siente que su carga es manejable",
"Carga de trabajo: El colaborador siente que su carga es medianamente manejable",
"Carga de trabajo: El colaborador siente que su carga es poco manejable",
"Carga de trabajo El colaborador siente que su carga de trabajo no es manejable",
"Salud fisica: El colaborador menciona tener una salud fisica excelente", 
"Salud fisica: El colaborador menciona tener una salud fisica buena",
"Salud fisica El colaborador menciona tener una salud fisica regular",
"Salud fisica El colaborador menciona tener una salud fisica un poco mala",
"Salud fisica: El colaborador menciona tener una salud fisica mala",
"Reconocimiento: El colaborador se siente altamente valorado por sus compañeros",
"Reconocimiento: El colaborador se siente valorado por sus compañeros",
"Reconocimiento: El colaborador se siente poco valorado por sus compañeros",
"Reconocimiento: El colaborador no se siente valorado por sus compañeros",
"Salud emocional: El colaborador se siente excelente emocionalmente y con emociones muy positivas",
"Salud emocional: El colaborador se siente muy bien emocionalmente y con emociones positivas",
"Salud emocional: El colaborador se siente bien emocionalmente y con emociones positivas",
"Salud emocional: El colaborador se siente regular emocionalmente y con emociones poco positivas",
"Salud emocional: El colaborador se siente mal emocionalmente y con emociones poco positivas",
"Equilibrio: El colaborador siente que hay mucho equilibrio entre su vida personal y trabajo",
"Equiilibrio: El colaborador siente que hay poco equilibrio entre su vida personal y trabajo",
};

// Defino la clase que voy a usar
class Mesurable {
    private:
        string id;
        string summary;

    public:
        Mesurable(string);
        string getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<Mesurable> mesurables;

// Constructor de una tupla
Mesurable::Mesurable(string summary_) {
    id = generateUUID();
    summary = summary_;
}

// Obtengo su Id
string Mesurable::getId(){
    return id;
}

// Impresión / Código en SQL
void Mesurable::print() {
    cout << "INSERT INTO oneOnOneMeasurable(measurableID, summary) VALUES('" << id << "', '" << summary << "'); \n";
}

// Función para crear la tabla con X registros
void createMesurables(int x){
    for(int i=0; i<x; i++){
        mesurables.add(Mesurable(summary.random()));
    }
}


#endif