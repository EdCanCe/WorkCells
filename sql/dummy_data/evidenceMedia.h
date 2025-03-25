#ifndef EVIDENCEMEDIA_H
#define EVIDENCEMEDIA_H

#include "random.h"
#include "evidence.h"

using namespace std;

Randomizer<string> mediaLink {
    "https://www.ejemplo.com/productos/calculadora-interes",
    "https://www.micompany.com/servicios/consultoria-web",
    "https://www.tuempresa.com/contacto/soporte",
    "https://www.tiendavirtual.com/blog/estrategias-marketing",
    "https://www.serviciosxyz.com/soluciones/internet-empresas",
    "https://www.nuevastecnologias.com/innovacion/digitalizacion",
    "https://www.creacionsistemas.com/planificación/pymes",
    "https://www.interactivewebs.com/proyectos/desarrollo-software",
    "https://www.redescomunicacion.com/tutoriales/redes-sociales",
    "https://www.ecommerceplus.com/guias/venta-online",
    "https://www.tutorialesweb.com/aprendizaje/codificacion",
    "https://www.digitalinnovators.com/estrategias/marketing",
    "https://www.empresainnovadora.com/noticias/lanzamientos",
    "https://www.soluciones360.com/soporte/atencion-cliente",
    "https://www.smartsolutions.com/servicios/paginas-web",
    "https://www.expertositio.com/blog/diseño-web",
    "https://www.nuevosproyectos.com/planificacion/estrategica",
    "https://www.sistemasmodernos.com/tecnologia/innovacion",
    "https://www.mundodigital.com/tutoriales/marketing-digital",
    "https://www.empresafuturo.com/servicios/desarrollo-tecnologico"
};

class EvidenceMedia {
    private:
        int id;
        string mediaLink;
        int idEvidence;
    public:
        EvidenceMedia(string, int);
        int getID();
        void print();
};

Randomizer<EvidenceMedia> evidenceMedia;

EvidenceMedia::EvidenceMedia(string mediaLink, int idEvidence) {
    id = evidenceMedia.size() + 1;
    this->mediaLink = mediaLink;
    this->idEvidence = idEvidence;
}

int EvidenceMedia::getID(){
    return id;
}

void EvidenceMedia::print(){
    cout << "INSERT INTO evidenceMedia(mediaLink, evidenceIDFK) values('" << mediaLink << "', " << idEvidence << "); \n";
};

void createEvidenceMedia(int x) {
    for (int i = 0; i < x; i++){
        evidenceMedia.add(EvidenceMedia(mediaLink.random(), evidence.random().getID()));
    }
    
}

#endif