#ifndef RANDOM_H
#define RANDOM_H

#include <iostream>
#include <sstream>
#include <iomanip>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

int getRandom(int x) {
    return rand() % x;
}

string generateUUID() {
    unsigned char uuid[16];

    for (int i = 0; i < 16; ++i) {
        uuid[i] = getRandom(256);
    }

    uuid[6] = (uuid[6] & 0x0f) | 0x40;

    uuid[8] = (uuid[8] & 0x3f) | 0x80;

    stringstream ss;
    ss << hex << setfill('0');

    for (int i = 0; i < 16; ++i) {
        ss << setw(2) << (int)uuid[i];
        if (i == 3 || i == 5 || i == 7 || i == 9) {
            ss << '-';
        }
    }

    return ss.str();
}

template <class T>
class Randomizer {
    private:
        vector<T> v;
        
    public:
        Randomizer();
        Randomizer(initializer_list<T> x);
        void add(T);
        T random();
        int size();
        void print();
};

template <class T>
Randomizer<T>::Randomizer() {
}

template <class T>
Randomizer<T>::Randomizer(initializer_list<T> x) {
    v = x;
}

template <class T>
void Randomizer<T>::add(T x) {
    v.push_back(x);
}

template <class T>
T Randomizer<T>::random() {
    return v[getRandom(v.size())];
}

template <class T>
int Randomizer<T>::size() {
    return v.size();
}

template <class T>
void Randomizer<T>::print() {
    for(auto i:v){
        i.print();
    }
    cout<<"\n";
}

#endif