#ifndef PRIVILEGES_H
#define PRIVILEGES_H

#include "random.h" // Documento para generar elementos aleatorios
using namespace std;

// Defino la clase que voy a usar
class Privilege {
    private:
        int id;
        string title;
        string summary;

    public:
        Privilege(string, string);
        int getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<Privilege> privileges;

// Constructor de una tupla
Privilege::Privilege(string Title, string Summary) {
    id = privileges.size() + 1;
    title = Title;
    summary = Summary;
}

// Obtengo su Id
int Privilege::getId(){
    return id;
}

// Impresión / Código en SQL
void Privilege::print() {
    cout << "INSERT INTO privilege(title, summary) values('" << title << "', '" << summary << "'); \n";
    // ! No olvidar comillas ' ' para datos string. Ni ; al final de línea
}

// Función para crear la tabla con X registros
void createPrivileges() {
    privileges.add(Privilege("Colaborador consulta ausencias", "Colaborador consulta ausencias."));
    privileges.add(Privilege("Colaborador consulta calendario", "Colaborador consulta calendario."));
    privileges.add(Privilege("Colaborador consulta días feriados", "Colaborador consulta días feriados."));
    privileges.add(Privilege("Colaborador consulta falta administrativa", "Colaborador consulta falta administrativa"));
    privileges.add(Privilege("Colaborador consulta KPIs", "Colaborador consulta KPIs."));
    privileges.add(Privilege("Colaborador consulta perfil", "Colaborador consulta perfil."));
    privileges.add(Privilege("Colaborador consulta sesión del One-On-One", "Colaborador consulta sesión del One-On-One."));
    privileges.add(Privilege("Colaborador consulta solicitudes de vacaciones", "Colaborador consulta solicitudes de vacaciones."));
    privileges.add(Privilege("Colaborador elimina solicitud de vacaciones", "Colaborador elimina solicitud de vacaciones."));
    privileges.add(Privilege("Colaborador modifica contraseña temporal", "Colaborador modifica contraseña temporal."));
    privileges.add(Privilege("Colaborador modifica solicitud de vacaciones", "Colaborador modifica solicitud de vacaciones."));
    privileges.add(Privilege("Colaborador registra ausencia", "Colaborador registra ausencia."));
    privileges.add(Privilege("Colaborador registra evidencia de KPI", "Colaborador registra evidencia de KPI."));
    privileges.add(Privilege("Colaborador registra inicio de sesión", "Colaborador registra inicio de sesión."));
    privileges.add(Privilege("Colaborador registra solicitud de vacaciones", "Colaborador registra solicitud de vacaciones."));
    privileges.add(Privilege("Líder consulta ausencias de colaborador", "Líder consulta ausencias de colaborador."));
    privileges.add(Privilege("Líder consulta colaboradores en su departamento", "Líder consulta colaboradores en su departamento."));
    privileges.add(Privilege("Líder consulta KPIs de colaborador", "Líder consulta KPIs de colaborador."));
    privileges.add(Privilege("Líder consulta perfil de colaboradores", "Líder consulta perfil de colaboradores."));
    privileges.add(Privilege("Líder consulta solicitudes de vacaciones de colaborador", "Líder consulta solicitudes de vacaciones de colaborador."));
    privileges.add(Privilege("Líder elimina KPIs de colaborador", "Líder elimina KPIs de colaborador."));
    privileges.add(Privilege("Líder modifica KPIs de colaborador", "Líder modifica KPIs de colaborador."));
    privileges.add(Privilege("Líder registra KPIs de colaborador", "Líder registra KPIs de colaborador."));
    privileges.add(Privilege("Líder registra respuesta hacia ausencia de colaborador", "Líder registra respuesta hacia ausencia de colaborador."));
    privileges.add(Privilege("Líder registra respuesta hacia solicitud de vacaciones de colaborador", "Líder registra respuesta hacia solicitud de vacaciones de colaborador."));
    privileges.add(Privilege("Superadmin consulta ausencias de empleado", "Superadmin consulta ausencias de empleado."));
    privileges.add(Privilege("Superadmin consulta empleados activos", "Superadmin consulta empleados activos."));
    privileges.add(Privilege("Superadmin consulta empleados inactivos", "Superadmin consulta empleados inactivos."));
    privileges.add(Privilege("Superadmin consulta reporte de rotación de empleos mensual", "Superadmin consulta reporte de rotación de empleos mensual."));
    privileges.add(Privilege("Superadmin consulta sesión del One-On-One", "Superadmin consulta sesión del One-On-One"));
    privileges.add(Privilege("Superadmin consulta solicitudes de vacaciones de empleado", "Superadmin consulta solicitudes de vacaciones de empleado."));
    privileges.add(Privilege("Superadmin elimina departamento", "Superadmin elimina departamento."));
    privileges.add(Privilege("Superadmin Elimina día feriado", "Superadmin elimina día feriado."));
    privileges.add(Privilege("Superadmin elimina falta administrativa", "Superadmin elimina falta administrativa."));
    privileges.add(Privilege("Superadmin Elimina Kpi de líder", "Superadmin elimina Kpi de líder."));
    privileges.add(Privilege("Superadmin modifica datos de empleado", "Superadmin modifica datos de empleado."));
    privileges.add(Privilege("Superadmin modifica departamento", "Superadmin modifica departamento."));
    privileges.add(Privilege("Superadmin Modifica día feriado", "Superadmin modifica día feriado."));
    privileges.add(Privilege("Superadmin modifica falta administrativa", "Superadmin modifica falta administrativa."));
    privileges.add(Privilege("Superadmin Modifica Kpi de líder", "Superadmin modifica Kpi de líder."));
    privileges.add(Privilege("Superadmin registra alta de empleado", "Superadmin registra alta de empleado."));
    privileges.add(Privilege("Superadmin registra baja de empleado", "Superadmin registra baja de empleado."));
    privileges.add(Privilege("Superadmin registra datos del One-On-One", "Superadmin registra datos del One-On-One."));
    privileges.add(Privilege("Superadmin registra departamento", "Superadmin registra departamento."));
    privileges.add(Privilege("Superadmin Registra día feriado", "Superadmin registra día feriado"));
    privileges.add(Privilege("Superadmin registra falta administrativa", "Superadmin registra falta administrativa."));
    privileges.add(Privilege("Superadmin registra fecha prevista de One-On-One", "Superadmin registra fecha prevista de One-On-One."));
    privileges.add(Privilege("Superadmin Registra Kpi de líder", "Superadmin registra Kpi de líder."));
    privileges.add(Privilege("Superadmin registra respuesta hacia ausencia de empleado", "Superadmin registra respuesta hacia ausencia de empleado."));
    privileges.add(Privilege("Superadmin registra respuesta hacia solicitud de vacaciones de empleado", "Superadmin registra respuesta hacia solicitud de vacaciones de empleado."));
}


#endif