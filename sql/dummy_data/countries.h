#ifndef COUNTRIES_H
#define COUNTRIES_H

#include "random.h"
using namespace std;

class Country {
    private:
        int id;
        string title;

    public:
        Country(string);
        int getId();
        void print();
};

Randomizer<Country> countries;

Country::Country(string Title) {
    id = countries.size() + 1;
    title = Title;
}

int Country::getId(){
    return id;
}

void Country::print() {
    cout << "INSERT INTO country(title) values('" << title << "'); \n";
}

void createCountries(){
    countries.add(Country("Mexico"));
    countries.add(Country("United States"));
    countries.add(Country("Colombia"));
    countries.add(Country("Argentina"));
}

#endif