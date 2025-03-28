#ifndef COUNTRIES_H
#define COUNTRIES_H

#include "random.h"
using namespace std;

class Country {
    private:
        string id;
        string title;

    public:
        Country(string);
        string getId();
        void print();
};

Randomizer<Country> countries;

Country::Country(string Title) {
    id = generateUUID();
    title = Title;
}

string Country::getId(){
    return id;
}

void Country::print() {
    cout << "INSERT INTO country(countryID, title) values('" << id << "', '" << title << "'); \n";
}

void createCountries(){
    countries.add(Country("Mexico"));
    countries.add(Country("United States"));
    countries.add(Country("Colombia"));
    countries.add(Country("Argentina"));
}

#endif