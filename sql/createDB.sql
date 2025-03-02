
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

-- ¿Qué atributos debería de llevar? xD
-- En el diagrama no tiene ningúno.

CREATE TABLE rolePrivilages (
    
    roleIDFK TINYINT NOT NULL,
    CONSTRAINT roleIDFK FOREIGN KEY (roleIDFK) REFERENCES role(roleID)
    privilegesIDFK TINYINT NOT NULL,
    CONSTRAINT privilegesIDFK FOREIGN KEY (privilegesIDFK) REFERENCES privileges(privilegesID)
)

CREATE TABLE user (
    userID MEDIUMINT NOT NULL PRIMARY KEY,
    zipCode TINYINT NOT NULL,
    houseNumber TINYINT NOT NULL,
    streetName VARCHAR(100),
    passwd VARCHAR(70) NOT NULL,
    passwdFlag BOOLEAN NOT NULL,
    mail VARCHAR(70) NOT NULL,
    fSurname VARCHAR(50) NOT NULL,
    mSurname VARCHAR(50),
    brithName VARCHAR(50) NOT NULL,
    workModality TINYINT NOT NULL, -- 0 = presencial, 1 = híbrida, 2 = homeOffice
    workStatus BOOLEAN NOT NULL, -- Le había puesto varchar por si acaso fuera de que hubiera un tercer caso jsjs, lo dejo como boolean
    roleIDFK TINYINT NOT NULL,
    CONSTRAINT roleIDFK FOREIGN KEY (roleIDFK) REFERENCES role(roleID)
);

CREATE TABLE workStatus (
    workStatusID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE,
    userIDFK MEDIUMINT NOT NULL,
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
    userIDFK MEDIUMINT NOT NULL,
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
    mediaLink VARCHAR(255) NOT NULL,
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
    userIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE absence (
    absenceID INT NOT NULL PRIMARY KEY,
    reason VARCHAR(300), -- si es menor a 3 días, especificar de forma automática. | Eso se especifica en el JavaScript | Simon, pero dejar como comentario para que, cuando alguien lo revise vea algo tipo "Sin razón. Menor a 3 días." o algo por el estilo.
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    justified BOOLEAN NOT NULL, -- mmm revisar si esto no está un poco de dictador no? xd | Pues es pq el lider de departamento "aprueba" las ausencias, no? | Pero por ejemplo, q tal si es la ausencia por enfermedad ¿se la va a negar?
    userIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE absenceMedia (
    absenceMediaID INT NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(255), -- Es not null, en caso de que no se ocupe un archivo multimedia se omitiría la creación de la tabla | mmm y que tal si la razón es porque se le murió alguien? creo q estaría gacho que en ese caso deba de presentar alguna evidencia xD, por eso no le puse el not null
    absenceIDFK BIGINT NOT NULL,
    CONSTRAINT absenceIDFK FOREIGN KEY (absenceIDFK) REFERENCES absence(absenceIDFK)
);

CREATE TABLE oneOnOne (
    oneOnOneID INT NOT NULL PRIMARY KEY,
    meetingDate TIMESTAMP NOT NULL,
    expectedTime TINYINT NOT NULL, -- esto hace referencia a cuanto tiempo va a durar la junta? | Yessir, la cantidad de minutos, por lo mismo cambiar a TinyInt | le puse TIME porque, supongo yo, no debería de durar más de 1 hora, aunque en cualquier caso, aunque dure más de una hora, aún así el tipo de dato podría ser TIME no? de todas formas ya lo puse como int jsjs
    userIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
)

CREATE TABLE oneOnOneQuestion (
    questionID TINYINT NOT NULL PRIMARY KEY,
    question VARCHAR(300) NOT NULL,
);

CREATE TABLE oneOnOneAnswer (
    answer VARCHAR(300) NOT NULL,
    oneOnOneIDFK BIGINT NOT NULL,
    CONSTRAINT oneOnOneIDFK FOREIGN KEY (oneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID),
    questionIDFK TINYINT NOT NULL,
    CONSTRAINT questionIDFK FOREIGN KEY (questionIDFK) REFERENCES oneOnOneQuestion(questionID)
);