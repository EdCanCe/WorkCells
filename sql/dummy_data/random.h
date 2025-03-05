#ifndef RANDOM_H
#define RANDOM_H

#include <bits/stdc++.h>
#include <cstdlib>
#include <ctime>
using namespace std;

template <class T>
class Randomizer {
    private:
        vector<T> v;
        int getRandom(int);
        
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
int Randomizer<T>::getRandom(int x) {
    return rand() % x;
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