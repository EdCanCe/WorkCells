#ifndef USERS_H
#define USERS_H

#include "random.h" // Documento para generar elementos aleatorios
#include "roles.h"
#include "countries.h"
using namespace std;

// Defino mis datos predeterminados en distintos atributos
Randomizer<string> name = {
"Juan",
"Enrique",
"Pedro",
"María",
"Ana",
"José",
"Lucía",
"David",
"Laura",
"Carlos",
"Isabel",
"Francisco",
"Antonio",
"Raquel",
"Elena",
"Pedro",
"Javier",
"Alberto",
"Mercedes",
"Fernando",
"Beatriz",
"Roberto",
"Susana",
"Rafael",
"Patricia",
"Adrián"
};

Randomizer<string> lastName = {
"González",
"Rodríguez",
"Martínez",
"Fernández",
"Moreno",
"Jiménez",
"Ruiz",
"Hernández",
"Torres"
};

Randomizer<string> mailEnd = {
"gmail.com",
"yahoo.com",
"nuclea.solutions",
"outlook.com"
};

Randomizer<string> streets = {
"Calle Hidalgo",
"Avenida Revolución",
"Calle Benito Juárez",
"Avenida Morelos",
"Calle 5 de Febrero",
"Calle Allende",
"Avenida Madero",
"Calle Juárez",
"Calle Corregidora",
"Avenida Universidad",
"Calle Zaragoza",
"Calle Guerrero",
"Avenida Constituyentes",
"Calle Juárez",
"Calle Vicente Guerrero",
"Avenida de los Arcos",
"Calle de la Corregidora",
"Calle de los Abetos",
"Avenida de la Luz",
"Calle de la Paz",
"Calle de los Naranjos",
"Avenida de los Insurgentes",
"Calle del Sol",
"Calle de la Luna",
"Avenida de la Independencia",
"Calle de la Reforma",
"Calle de los Pinos",
"Avenida de la Libertad",
"Calle de los Cedros",
"Calle de la Esperanza",
"Avenida de la Solidaridad",
"Calle de la Amistad",
"Calle del Carmen",
"Avenida de la Juventud",
"Calle de la Merced",
"Calle de la Santa Cruz",
"Avenida de la Constitución",
"Calle de la Virgen",
"Calle de la Estación"
};

Randomizer<string> colonies = {
"Colonia Centro",
"Colonia Valle Verde",
"Colonia San Francisco",
"Colonia Morelos",
"Colonia El Mirador",
"Colonia Emiliano Zapata",
"Colonia Santa Fe",
"Colonia Lomas de Querétaro",
"Colonia El Cerrito",
"Colonia Los Ángeles",
"Colonia El Campanario",
"Colonia San José",
"Colonia Las Águilas",
"Colonia La Pradera",
"Colonia Santa Rosa",
"Colonia del Sol",
"Colonia Reforma",
"Colonia El Laurel",
"Colonia Nuevo Milenio",
"Colonia Jardines de Querétaro"
};

Randomizer<string> states = {
    "AS", "BC", "BS", "CM", "CS", "CH", "CL", "CM", "DG", 
    "GT", "GR", "HG", "JC", "MC", "MN", "MS", "NT", "NL", 
    "OC", "PL", "QT", "QR", "SL", "SL", "SR", "TC", "TL", 
    "TL", "VZ", "YN", "ZS"
};

// Defino la clase que voy a usar
class User {
    private:
        string id;
        string curp;
        string rfc;
        string birthName;
        string surname;
        string mail;
        string passwd;
        bool passwdFlag;
        int zipCode;
        string houseNumber;
        string streetName;
        string colony;
        int workModality;
        bool workStatus;
        string userRoleIDFK;
        string countryUserIDFK;

    public:
        User(string, string, string, string, string, string, string, bool, int, string, string, string, int, bool, string, string);
        string getId();
        void print();
};

// Creo un randomizador de dicha clase para usarla en un futuro
Randomizer<User> users;
vector<string> userIds;

// Constructor de una tupla
User::User(string Id, string CURP, string RFC, string BirthName, string Surname, string Mail, string Passwd, bool PasswdFlag, int ZipCode, string HouseNumber, string StreetName, string Colony, int WorkModality, bool WorkStatus, string UserRoleIDFK, string CountryUserIDFK) {
    id = Id;
    userIds.push_back(id);
    curp = CURP;
    rfc = RFC;
    birthName = BirthName;
    surname = Surname;
    mail = Mail;
    passwd = Passwd;
    passwdFlag = PasswdFlag;
    zipCode = ZipCode;
    houseNumber = HouseNumber;
    streetName = StreetName;
    colony = Colony;
    workModality = WorkModality;
    workStatus = WorkStatus;
    userRoleIDFK = UserRoleIDFK;
    countryUserIDFK = CountryUserIDFK;
}

// Obtengo su Id
string User::getId(){
    return id;
}

// Impresión / Código en SQL
void User::print() {
    cout << "INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('" << id << "', '" << curp << "', '" << rfc << "', '" << birthName << "', '" << surname << "', '" << mail << "', '" << passwd << "', " << (passwdFlag ? "TRUE" : "FALSE") << ", " << zipCode << ", '" << houseNumber << "', '" << streetName << "', '" << colony << "', " << workModality << ", " << (workStatus ? "TRUE" : "FALSE") << ", '" << userRoleIDFK << "', '" << countryUserIDFK << "');\n";
}

string createUserID(){
    return generateUUID();;
}

string createString(){
    int length = 7 + getRandom(7);
    string s;
    for(int i=0; i<length; i++){
        s = s + char('a' + getRandom('z' - 'a'));
    }
    return s;
}

string upperString(string s) {
    std::locale loc;
    for (int i = 0; i < s.size(); i++) {
        s[i] = std::toupper(s[i], loc);  // Convert to uppercase using the current locale
    }
    return s;
}

string createCurp(string Name,string FLname,string MLname) {
    string nameInitial = Name.substr(0, 1);
    string paternalInitial = FLname.substr(0, 2);
    string maternalInitial = MLname.substr(0, 1);
    
    string birthDate = to_string(getRandom(5)) + to_string(getRandom(12)) + to_string(getRandom(30));

    char gender = (getRandom(2) == 0) ? 'H' : 'M'; 
    
    string state = states.random();

    string randomString = createString().substr(0, 3) + to_string(10 + getRandom(90));

    return upperString(paternalInitial + maternalInitial + nameInitial + birthDate + gender + state + randomString);
}

string createRfc(string Curp) {
    string base = Curp.substr(0, 10);
    return base + char('A' + getRandom('z' - 'a')) + to_string(getRandom(10));
}

string createMail(){
    return createString() + '@' + mailEnd.random();
}

int createZipCode(){
    return 10000 + getRandom(90000);
}

string createHouseNumber() {
    int number = 1 + getRandom(999);
    char letter = 'A' + getRandom(3);
    return to_string(number) + "." + letter;
}

// Función para crear la tabla con X registros
void createUsers(int x){
    for(int i=0; i<x; i++){
        string Name = name.random();
        string FLname = lastName.random();
        string MLname = lastName.random();
        string role = roles[getRandom(roles.size())].getId();
        string Curp = createCurp(Name, FLname, MLname);
        users.add(User(createUserID(), Curp, createRfc(Curp), Name, (FLname + " " + MLname), createMail(), createString(), getRandom(2), createZipCode(), createHouseNumber(), streets.random(), colonies.random(), getRandom(4), getRandom(2), role, countries.random().getId()));
    }
}


#endif