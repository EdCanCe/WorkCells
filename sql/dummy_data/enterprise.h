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
        string id;
        string title;
    public:
        Enterprise(string);
        string getId();
        void print();
};

Randomizer<Enterprise> enterprise;

Enterprise::Enterprise(string title) {
    id = generateUUID();
    this->title = title;
}

string Enterprise::getId() {
    return id;
}

void Enterprise::print() {
    cout << "INSERT INTO enterprise(enterpriseID, title) values('" << id << "', '" << title << "'); \n";
}

void createEnterprise(int x) {
    for (int i = 0; i < x; i++) {
        enterprise.add(Enterprise(title.random()));
    }
}

#endif