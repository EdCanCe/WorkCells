#ifndef ENTERPRISE_H
#define ENTERPRISE_H

#include "random.h"

using namespace std;

class Enterprise {
    private:
        string id;
        string title;
    public:
        Enterprise(string);
        string getId();
        void print();
};

vector<Enterprise> enterprise;

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

void createEnterprise() {
    enterprise.push_back(Enterprise("Nuclea"));
    enterprise.push_back(Enterprise("ZigZag"));
    enterprise.push_back(Enterprise("WePage"));
    enterprise.push_back(Enterprise("Maya"));
    enterprise.push_back(Enterprise("Moca"));
    enterprise.push_back(Enterprise("All"));

    for (auto i:enterprise) {
        i.print();
    }
}

#endif