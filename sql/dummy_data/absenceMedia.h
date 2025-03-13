#ifndef ABSENCEMEDIA_H
#define ABSENCEMEDIA_H

#include "random.h"
#include "absence.h"

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

class AbsenceMedia {
    private:
        string id;
        string mediaLink;
        string idAbsence;
    public:
        AbsenceMedia(string, string);
        string getId();
        void print();
};

Randomizer<AbsenceMedia> absenceMedia;

AbsenceMedia::AbsenceMedia(string mediaLink, string idAbsence) {
    id = generateUUID();
    this->mediaLink = mediaLink;
    this->idAbsence = idAbsence;
}

string AbsenceMedia::getId(){
    return id;
}

void AbsenceMedia::print(){
    cout << "INSERT INTO absenceMedia(absenceMediaID, mediaLink, absenceIDFK) values('" << id << "', '" << mediaLink << "', '" << idAbsence << "'); \n";
};

void createAbsenceMedia(int x) {
    for (int i = 0; i < x; i++){
        absenceMedia.add(AbsenceMedia(mediaLink.random(), absence.random().getId()));
    }
}

#endif