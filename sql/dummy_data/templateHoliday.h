#ifndef TEMPLATEHOLIDAY_H
#define TEMPLATEHOLIDAY_H

#include "random.h"
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> title = {
    "Aniversario empresa",
    "Revolución",
    "Independencia",
    "Día de reyes",
    "Día de la Constitución",
    "Natalicio de Benito Juárez",
    "Semana Santa",
    "Día del Trabajo",
    "Día de la Madre",
    "Día del Padre",
    "Día de la Bandera",
    "Día de Muertos",
    "Navidad",
    "Día de la Virgen de Guadalupe",
    "Día del Ejército",
    "Día de los Abuelos",
    "Día del Maestro",
    "Día del Niño",
    "Día del Estudiante",
    "Día Internacional de la Mujer",
    "Día del Amor y la Amistad",
    "Día Internacional del Trabajo",
    "Día Internacional de la Paz",
    "Día Mundial del Medio Ambiente",
    "Día de la Raza",
    "Día de San Valentín",
    "Día Mundial de la Salud",
    "Día del Bombero",
    "Día del Policía",
    "Día del Arquitecto"
};

Randomizer<string> date = {
    "2026-01-02", // Aniversario empresa
    "1910-11-20", // Revolución
    "1920-09-15", // Independencia
    "2000-01-07", // Día de Reyes
    "1917-02-05", // Día de la Constitución
    "1806-03-21", // Natalicio de Benito Juárez
    "2026-04-02", // Semana Santa (Viernes Santo)
    "1886-05-01", // Día del Trabajo
    "2026-05-10", // Día de la Madre
    "2026-06-16", // Día del Padre
    "1934-02-24", // Día de la Bandera
    "2026-11-02", // Día de Muertos
    "2026-12-25", // Navidad
    "1531-12-12", // Día de la Virgen de Guadalupe
    "2026-02-19", // Día del Ejército
    "2026-08-28", // Día de los Abuelos
    "2026-05-15", // Día del Maestro
    "2026-04-30", // Día del Niño
    "2026-05-23", // Día del Estudiante
    "2026-03-08", // Día Internacional de la Mujer
    "2026-02-14", // Día del Amor y la Amistad
    "2026-06-05", // Día Mundial del Medio Ambiente
    "2026-10-12", // Día de la Raza
    "2026-04-07", // Día Mundial de la Salud
    "2026-08-22", // Día del Bombero
    "2026-06-02", // Día del Policía
    "2026-10-01", // Día del Arquitecto
    "2026-09-21"  // Día Internacional de la Paz
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
