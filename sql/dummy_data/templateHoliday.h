#ifndef TEMPLATEHOLIDAY_H
#define TEMPLATEHOLIDAY_H

#include "random.h"
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> title = {
    "Aniversario empresa",
    "Revolución",
    "Independencia",
    "Día de reyes"
};

Randomizer<string> date = {
    "2026/01/02",
    "1910/11/20",
    "1920/09/15",
    "2000/01/07"
};

// Defino la clase que voy a usar
class templateHoliday {
    private:
        int id;
        string holidayDate;
        string title;

    public:
        templateHoliday(string, string);
        int getId();
        void print();
};

Randomizer<templateHoliday> templateHolidays;

// Constructor de la clase
templateHoliday::templateHoliday(string holiday_date, string title_) {
    id = templateHolidays.size() + 1;
    holidayDate = holiday_date;
    title = title_;
}

// Obtengo su Id
int templateHoliday::getId() {
    return id;
}

// Impresión / Código en SQL
void templateHoliday::print() {
    cout << "INSERT INTO templateHoliday(holidayDate, title) VALUES('" << holidayDate << "', '" << title << "');\n";
}

// Función para crear la tabla con X registros
void createTemplateHolidays(int x) {
    for (int i = 0; i < x; i++) {
        templateHolidays.add(templateHoliday(date.random(), title.random()));
    }
}

#endif
