BEGIN -- No es totalmente necesario detallar el begin

CREATE TABLE holiday (
    holidayDate TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE privileges (
    privilegesID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(300)
);

CREATE TABLE role (
    roleID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

-- La relación de privileges y role es de N a N, se ocupa crear una tabla llamada rolePrivileges en donde tengas las FK de ambas

CREATE TABLE user (
    userID BIGINT NOT NULL PRIMARY KEY, -- Con un mediumInt podría jalar
    zipCode TINYINT NOT NULL,
    houseNumber TINYINT NOT NULL,
    streetName VARCHAR(100),
    passwd VARCHAR(70) NOT NULL,
    passwdFlag BOOLEAN NOT NULL,
    mail VARCHAR(50) NOT NULL, -- Cambiar a 70 caracteres quizás
    fSurname VARCHAR(50) NOT NULL,
    mSurname VARCHAR(50), -- BTW, ésta es not null pq no todas las personas tienen 2 apellidos, ejemplo: Estadounidenses, ellos tienen solo 1
    brithName VARCHAR(50) NOT NULL,
    workModality VARCHAR(50) NOT NULL, -- Cambiar a tinyInt, 0 = presencial, 1 = híbrida, 2 = homeOffice
    workStatus VARCHAR(50) NOT NULL, -- Es booleana
    roleIDFK TINYINT NOT NULL,
    CONSTRAINT roleIDFK FOREIGN KEY (roleIDFK) REFERENCES role(roleID)
);

CREATE TABLE workStatus (
    workStatusID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE,
    userIDFK BIGINT NOT NULL, -- Si se cambia el id del usuario a mediumInt, éste también se tiene que tambiar a int
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE enterprise (
    enterpriseID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE departament (
    departamentID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    enterpriseIDFK TINYINT NOT NULL,
    CONSTRAINT enterpriseIDFK FOREIGN KEY (enterpriseIDFK) REFERENCES enterprise(enterpriseID)
);

CREATE TABLE kpi (
    kpiID INT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    creationDate DATE NOT NULL,
    progress TINYINT NOT NULL,
    goal VARCHAR(300) NOT NULL,
    monthDuration TINYINT NOT NULL,
    departamentIDFK TINYINT NOT NULL,
    CONSTRAINT departamentIDFK FOREIGN KEY (departamentIDFK) REFERENCES departament(departamentID),
    userIDFK BIGINT NOT NULL, -- Si se cambia el id del usuario a mediumInt, éste también se tiene que tambiar a int
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE evidence (
    evidenceID INT NOT NULL PRIMARY KEY,
    summary VARCHAR(300) NOT NULL,
    uploadDate TIMESTAMP NOT NULL,
    kpiIDFK INT NOT NULL,
    CONSTRAINT kpiIDFK FOREIGN KEY (kpiIDFK) REFERENCES kpi(kpiID)
);

CREATE TABLE evidenceMedia (
    evidenceMediaID INT NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(255), -- También es not null
    evidenceIDFK INT NOT NULL,
    CONSTRAINT evidenceIDFK FOREIGN KEY (evidenceIDFK) REFERENCES evidence(evidenceID)
);

CREATE TABLE vactions (
    vacationsID INT NOT NULL PRIMARY KEY,
    leaderStatus BOOLEAN NOT NULL,
    reason VARCHAR(300),
    HRStatus BOOLEAN NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    userIDFK BIGINT NOT NULL, -- Si se cambia el id del usuario a mediumInt, éste también se tiene que tambiar a int
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE absence (
    absenceID TINYINT NOT NULL PRIMARY KEY, -- Se ocuparía un int yo creo
    reason VARCHAR(300), -- si es menor a 3 días, especificar de forma automática. | Eso se especifica en el JavaScript
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    justified BOOLEAN NOT NULL, -- mmm revisar si esto no está un poco de dictador no? xd | Pues es pq el lider de departamento "aprueba" las ausencias, no?
    userIDFK BIGINT NOT NULL, -- Si se cambia el id del usuario a mediumInt, éste también se tiene que tambiar a int
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE absenceMedia (
    absenceMediaID TINYINT NOT NULL PRIMARY KEY, -- Se ocuparía cambiar a int yo creo
    mediaLink VARCHAR(255), -- Es not null, en caso de que no se ocupe un archivo multimedia se omitiría la creación de la tabla
    absenceIDFK BIGINT NOT NULL,
    CONSTRAINT absenceIDFK FOREIGN KEY (absenceIDFK) REFERENCES absence(absenceIDFK)
);

CREATE TABLE oneOnOne (
    oneOnOneID TINYINT NOT NULL PRIMARY KEY, -- Se ocuparía cambiar a int yo creo
    meetingDate TIMESTAMP NOT NULL,
    expectedTime TIME NOT NULL, -- esto hace referencia a cuanto tiempo va a durar la junta? | Yessir, la cantidad de minutos, por lo mismo cambiar a TinyInt
    userIDFK BIGINT NOT NULL, -- Si se cambia el id del usuario a mediumInt, éste también se tiene que tambiar a int
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
)

CREATE TABLE oneOnOneQuestion (
    questionID TINYINT NOT NULL PRIMARY KEY,
    question VARCHAR(300) NOT NULL,
    oneOnOneIDFK TINYINT NOT NULL, -- La relación con el One on One va en la tabla de oneOnOneAnswers
    CONSTRAINT oneOnOneIDFK FOREIGN KEY (oneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID)
);

-- Lo siguiente es correcto? es decir, si son dos llaves foraneas o debería de ser una llave compuesta? | Está bien con las llaves foráneas
-- y bueno, en general está bien? aunque creo que no pq no puse llave primaria jsjsjs | No ocupan llevar todas llaves primarias
CREATE TABLE oneOnOneAnswer (
    answer VARCHAR(300) NOT NULL,
    oneOnOneIDFK BIGINT NOT NULL,
    CONSTRAINT oneOnOneIDFK FOREIGN KEY (oneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID),
    questionIDFK TINYINT NOT NULL,
    CONSTRAINT questionIDFK FOREIGN KEY (questionIDFK) REFERENCES oneOnOneQuestion(questionID)
);