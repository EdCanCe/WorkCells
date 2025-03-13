#ifndef EVIDENCEMEDIA_H
#define EVIDENCEMEDIA_H

#include "random.h"
#include "evidence.h"

using namespace std;

class EvidenceMedia {
    private:
        string id;
        string mediaLink;
        int idEvidence;
    public:
        EvidenceMedia(string, int);
        string getId();
        void print();
};

Randomizer<EvidenceMedia> evidenceMedia;

EvidenceMedia::EvidenceMedia(string mediaLink, int idEvidence) {
    id = evidenceMedia.size() + 1;
    this->mediaLink = mediaLink;
    this->idEvidence = idEvidence;
}

int EvidenceMedia::getId(){
    return id;
}

void EvidenceMedia::print(){
    cout << "INSERT INTO evidenceMedia(mediaLink, evidenceIDFK) values('" << mediaLink << "', " << idEvidence << "); \n";
};

void createEvidenceMedia(int x) {
    for (int i = 0; i < x; i++){
        evidenceMedia.add(EvidenceMedia(mediaLink.random(), evidence.random().getId()));
    }
    
}

#endif