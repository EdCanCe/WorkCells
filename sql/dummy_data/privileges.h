#ifndef PRIVILEGES_H
#define PRIVILEGES_H

#include "random.h" // Documento para generar elementos aleatorios
using namespace std;

// Randomizer de privilegios
vector<string> actions = {
    "Colaborador consulta ausencias",
    "Colaborador consulta calendario",
    "Colaborador consulta días feriados",
    "Colaborador consulta falta administrativa",
    "Colaborador consulta perfil",
    "Colaborador consulta sesión del One-On-One",
    "Colaborador consulta solicitudes de vacaciones",
    "Colaborador elimina solicitud de vacaciones",
    "Colaborador modifica contraseña temporal",
    "Colaborador modifica solicitud de vacaciones",
    "Colaborador registra ausencia",
    "Colaborador registra inicio de sesión",
    "Colaborador registra solicitud de vacaciones",
    "Líder consulta ausencias de colaborador",
    "Líder consulta colaboradores en su departamento",
    "Líder consulta perfil de colaboradores",
    "Líder consulta solicitudes de vacaciones de colaborador",
    "Líder registra respuesta hacia ausencia de colaborador",
    "Líder registra respuesta hacia solicitud de vacaciones de colaborador",
    "Superadmin consulta ausencias de empleado",
    "Superadmin consulta empleados",
    "Superadmin consulta sesión de One-On-One",
    "Superadmin consulta solicitudes de vacaciones de empleado",
    "Superadmin consultar reporte de rotación de empleos mensual",
    "Superadmin elimina departamento",
    "Superadmin elimina día feriado",
    "Superadmin elimina falta administrativa",
    "Superadmin modifica datos de empleado",
    "Superadmin modifica departamento",
    "Superadmin modifica día feriado",
    "Superadmin modifica falta administrativa",
    "Superadmin registra alta de empleado",
    "Superadmin registra baja de empleado",
    "Superadmin registra datos del One-On-One",
    "Superadmin registra departamento",
    "Superadmin registra día feriado",
    "Superadmin registra falta administrativa",
    "Superadmin registra evidencia de falta",
    "Superadmin registra fecha prevista de One-On-One",
    "Superadmin registra respuesta hacia ausencia de empleado",
    "Superadmin registra respuesta hacia solicitud de vacaciones de empleado"
};


// Defino la clase que voy a usar
class Privilege {
    private:
        string id;
        string title;
        string summary;

    public:
        Privilege(string, string);
        string getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
vector<Privilege> privileges;

// Constructor de una tupla
Privilege::Privilege(string Title, string Summary) {
    id = generateUUID();
    title = Title;
    summary = Summary;
}

// Obtengo su Id
string Privilege::getId(){
    return id;
}

// Impresión / Código en SQL
void Privilege::print() {
    cout << "INSERT INTO privilege(privilegeID, title, summary) values('" << id << "', '" << title << "', '" << summary << "'); \n";
    // ! No olvidar comillas ' ' para datos string. Ni ; al final de línea
}

// Función para crear la tabla con X registros
void createPrivileges() {
    for(auto i:actions){
        privileges.push_back(Privilege(i, i));
    }
}

#endif