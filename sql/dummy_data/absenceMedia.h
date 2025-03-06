#ifndef ABSENCEMEDIA_H
#define ABSENCEMEDIA_H

#include "random.h"
#include "absence.h"
#include "evidenceMedia.h"

using namespace std;

class AbsenceMedia {
    private:
        int id;
        string mediaLink;
        int idAbsence;
    public:
        AbsenceMedia(string, int);
        int getID();
        void print();
};

Randomizer<AbsenceMedia> absenceMedia;

AbsenceMedia::AbsenceMedia(string mediaLink, int idAbsence) {
    id = absenceMedia.size() + 1;
    this->mediaLink = mediaLink;
    this->idAbsence = idAbsence;
}

int AbsenceMedia::getID(){
    return id;
}

void AbsenceMedia::print(){
    cout << "INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('" << mediaLink << "', " << idAbsence << "); \n";
};

void createAbsenceMedia(int x) {
    for (int i = 0; i < x; i++){
        absenceMedia.add(AbsenceMedia(mediaLink.random(), absence.random().getID()));
    }
}

#endif