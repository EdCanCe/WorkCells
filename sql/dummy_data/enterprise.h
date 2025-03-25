#ifndef ENTERPRISE_H
#define ENTERPRISE_H

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

class Enterprise {
    private:
        int id;
        string title;
    public:
        Enterprise(string);
        int getID();
        void print();
};

Randomizer<Enterprise> enterprise;

Enterprise::Enterprise(string title) {
    id = enterprise.size() + 1;
    this->title = title;
}

int Enterprise::getID() {
    return id;
}

void Enterprise::print() {
    cout << "INSERT INTO enterprise(title) values('" << title << "'); \n";
}

void createEnterprise(int x) {
    for (int i = 0; i < x; i++) {
        enterprise.add(Enterprise(title.random()));
    }
}

#endif