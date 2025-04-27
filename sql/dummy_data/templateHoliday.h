#ifndef TEMPLATEHOLIDAY_H
#define TEMPLATEHOLIDAY_H

#include "random.h"
using namespace std;

class TemplateHoliday {
    private:
        string templateHolidayID;
        string holidayDate;
        string title;

    public:
        TemplateHoliday(string, string);
        string getId();
        void print();
};

vector<TemplateHoliday> templateHolidays;

string TemplateHoliday::getId(){
    return templateHolidayID;
}

TemplateHoliday::TemplateHoliday(string _holidayDate, string _title) {
    this->templateHolidayID = generateUUID();
    this->holidayDate = _holidayDate;
    this->title = _title;
}

void TemplateHoliday::print() {
    cout << "INSERT INTO templateHoliday(templateHolidayID, holidayDate, title) values('" << templateHolidayID << "', '" << holidayDate << "', '" << title << "'); \n";
}

void createTemplateHoliday() {
    /*                                        fecha / nombre  */
    templateHolidays.push_back(TemplateHoliday("New Year", "2025-01-01"));
    templateHolidays.push_back(TemplateHoliday("Constitution Day", "2025-02-05"));
    templateHolidays.push_back(TemplateHoliday("Benito Juárez Birthday", "2025-03-21"));
    templateHolidays.push_back(TemplateHoliday("Labor Day", "2025-05-01"));
    templateHolidays.push_back(TemplateHoliday("Independence Day", "2025-09-16"));
    templateHolidays.push_back(TemplateHoliday("Revolution Day", "2025-10-20"));
    templateHolidays.push_back(TemplateHoliday("Christmas", "2025-12-25"));

    for (auto i:templateHolidays) {
        i.print();
    }
}

#endif
