#ifndef QUESTIONS_H
#define QUESTIONS_H

#include "random.h" // Documento para generar elementos aleatorios
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> question = {
"¿De qué estás orgulloso del mes pasado?",
"¿Estás preocupado, decepcionado o estresado?",
"¿En qué te encuentras trabajando?",
"¿Cuál va a ser tu meta del mes?",
"¿Qué vamos hacer para cumplir las metas?", 
"¿Tuviste alguna situación complicada en tu semana que afectara en tu trabajo?",
"¿Cuentas con los recursos necesarios para completar tu trabajo?",
"¿El trabajo y las entregas van en el tiempo planeado?",
"¿A quién quiero reconocer en la semana?"
};

// Defino la clase que voy a usar
class Question {
    private:
        int id;
        string question;

    public:
        Question(string);
        int getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<Question> questions;

// Constructor de una tupla
Question::Question(string question_) {
    id = questions.size() + 1;
    question = question_;
}

// Obtengo su Id
int Question::getId(){
    return id;
}

// Impresión / Código en SQL
void Question::print() {
    cout << "INSERT INTO oneOnOneQuestion(question) VALUES('" << question << "'); \n";
}

// Función para crear la tabla con X registros
void createQuestions(int x){
    for(int i=0; i<x; i++){
        questions.add(Question(question.random()));
    }
}


#endif