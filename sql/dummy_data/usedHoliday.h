#ifndef USEDHOLIDAY_H
#define USEDHOLIDAY_H

#include "random.h"
#include "templateHoliday.h"
using namespace std;

// Clase para los días festivos utilizados
class UsedHoliday {
    private:
        string usedHolidayID;
        string usedDate;
        string usedTemplateHolidayIDFK;

    public:
        UsedHoliday(string, string);
        string getId();
        void print();
};

vector<UsedHoliday> usedHolidays;

string UsedHoliday::getId(){
    return usedHolidayID;
}

UsedHoliday::UsedHoliday(string _usedDate, string _usedTemplateHolidayIDFK) {
    this->usedHolidayID = generateUUID();
    this->usedDate = _usedDate;
    this->usedTemplateHolidayIDFK = _usedTemplateHolidayIDFK;
}

void UsedHoliday::print() {
    cout << "INSERT INTO usedHoliday(usedHolidayID, usedDate, usedTemplateHolidayIDFK) values('" 
        << usedHolidayID << "', '" << usedDate << "', '" << usedTemplateHolidayIDFK << "'); \n";
}

void createUsedHolidays() {
    /*                                 usedDate /    templateHolidayID*/
    usedHolidays.push_back(UsedHoliday("2025-01-01", templateHolidays[0].getId()));
    usedHolidays.push_back(UsedHoliday("2025-02-03", templateHolidays[1].getId()));
    usedHolidays.push_back(UsedHoliday("2025-03-17", templateHolidays[2].getId()));
    usedHolidays.push_back(UsedHoliday("2025-05-01", templateHolidays[3].getId()));
    usedHolidays.push_back(UsedHoliday("2025-09-16", templateHolidays[4].getId()));
    usedHolidays.push_back(UsedHoliday("2025-10-17", templateHolidays[5].getId()));
    usedHolidays.push_back(UsedHoliday("2025-12-25", templateHolidays[6].getId()));

    for (auto i:usedHolidays) {
        i.print();
    }
}

#endif
