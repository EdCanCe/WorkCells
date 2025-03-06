#ifndef ANSWER_H
#define ANSWER_H

#include "random.h" // Documento para generar elementos aleatorios
#include "oneonone.h" // Documento para definir la estructura de un oneonone
#include "question.h" // Documento para definir la estructura de una preguntas
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> answers = {
    "Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.",
    "Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.",
    "En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.",
    "Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.",
    "Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.",
    "Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.",
    "Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.",
    "Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.",
    "Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.",
    "Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.",
    "Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.",
    "En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.",
    "Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.",
    "En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.",
    "Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.",
    "La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.",
    "Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados."
};

// Defino la clase que voy a usar
class Answer {
    private:
        string answer;
        int answerOneOnOneIDFK; // ID del One On One
        int questionIDFK; // ID de la pregunta

    public:
        Answer(string, int, int);
        int getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<Answer> answers_1;

// Constructor de una tupla
Answer::Answer(string answer_, int answerOneOnOneIDFK_, int questionIDFK_) {
    answer = answer_;
    answerOneOnOneIDFK = answerOneOnOneIDFK_;
    questionIDFK = questionIDFK_;
}

// Impresión / Código en SQL
void Answer::print() {
    cout << "INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('" << answer << "', " << answerOneOnOneIDFK << ", " << questionIDFK << ");\n";
}

// Función para crear la tabla con X registros
void createAnswer(int x){
    for(int i=0; i<x; i++){
        answers_1.add(Answer(answers.random(), oneonones.random().getId(), questions.random().getId()));
    }
}


#endif