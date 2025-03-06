#ifndef ENTERPRISE.H
#define ENTERPRISE.H

#include "random.h"

using namespace std;

Randomizer<string> title {
    "Apple",
    "Amazon",
    "Google",
    "Nvidia",
    "Open IA",
    "Microsoft",
    "AMD",
    "Intel",
    "Oracle",
    "Meta"
};

class Enterprise
{
private:
    int id;
    string title;
public:
    Enterprise(int, string);
    int getID();
    void print();
};

Randomizer<Enterprise> Enterprise;

Enterprise::Enterprise(string title) {
    id = Enterprise.size() + 1;
    this->title = title;
}

int Enterprise::getID() {
    return id;
}

void Enterprise::print() {
    cout << "INSERT INTO enterprise(tittle) values('" << title << "'); \n";
}

void createEnterprise(int x) {
    for (int i = 0; i < x; i++) {
        Enterprise.add(Enterprise(title.random()));
    }
}