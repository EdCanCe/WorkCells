#ifndef FAULTMEDIA_H
#define FAULTMEDIA_H

#include "random.h"
#include "fault.h"
#include "absenceMedia.h"

using namespace std;

class FaultMedia {
    private:
        string id;
        string mediaLink;
        string idFault;
    public:
        FaultMedia(string, string);
        string getId();
        void print();
};

Randomizer<FaultMedia> faultMedia;

FaultMedia::FaultMedia(string mediaLink, string idFault) {
    id = generateUUID();
    this->mediaLink = mediaLink;
    this->idFault = idFault;
}

string FaultMedia::getId(){
    return id;
}

void FaultMedia::print(){
    cout << "INSERT INTO faultMedia(faultMediaID, mediaLink, faultIDFK) values('" << id << "', '" << mediaLink << "', '" << idFault << "'); \n";
};

void createFaultMedia(int x) {
    for (int i = 0; i < x; i++){
        faultMedia.add(FaultMedia(mediaLink.random(), faults.random().getId()));
    }
}

#endif