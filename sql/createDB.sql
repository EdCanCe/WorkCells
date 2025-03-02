BEGIN

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

CREATE TABLE user (
    userID BIGINT NOT NULL PRIMARY KEY,
    zipCode TINYINT NOT NULL,
    houseNumber TINYINT NOT NULL,
    streetName VARCHAR(100),
    passwd VARCHAR(70) NOT NULL,
    passwdFlag BOOLEAN NOT NULL,
    mail VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    brithName VARCHAR(50) NOT NULL,
    workModality VARCHAR(50) NOT NULL,
    workStatus VARCHAR(50) NOT NULL
    roleIDFK TINYINT NOT NULL,
    CONSTRAINT roleIDFK FOREIGN KEY (roleIDFK) REFERENCES role(roleID)
);

CREATE TABLE workStatus (
    workStatusID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE,
    userIDFK BIGINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE enterprise (
    enterpriseID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE departament (
    departamentID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
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
    CONSTRAINT departamentIDFK FOREIGN KEY (departamentIDFK) REFERENCES departament(departamentID)
    userIDFK BIGINT NOT NULL,
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
    mediaLink VARCHAR(255),
    evidenceIDFK INT NOT NULL,
    CONSTRAINT evidenceIDFK FOREIGN KEY (evidenceIDFK) REFERENCES evidence(evidenceID)
);

CREATE TABLE vactions (
    vacationsID INT NOT NULL PRIMARY KEY,
    leaderStatus BOOLEAN NOT NULL,
    reason VARCHAR(300),
    HRStatus BOOLEAN NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL
    userIDFK BIGINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE absence (
    absenceID TINYINT NOT NULL PRIMARY KEY,
    reason VARCHAR(300) NOT NULL, -- si es menor a 3 días, especificar de forma automática.
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    justified BOOLEAN NOT NULL, -- mmm revisar si esto no está un poco de dictador no? xd
    userIDFK BIGINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE absenceMedia (
    absenceMediaID TINYINT NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(255),
    absenceIDFK BIGINT NOT NULL,
    CONSTRAINT absenceIDFK FOREIGN KEY (absenceIDFK) REFERENCES absence(absenceIDFK)
);

CREATE TABLE oneOnOne (
    oneOnOneID TINYINT NOT NULL PRIMARY KEY,
    meetingDate TIMESTAMP NOT NULL,
    expectedTime TIME NOT NULL, -- esto hace referencia a cuanto tiempo va a durar la junta?
    userIDFK BIGINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
)

CREATE TABLE oneOnOneQuestions (
    questionsID TINYINT NOT NULL PRIMARY KEY,
    question VARCHAR(300) NOT NULL
    oneOnOneIDFK TINYINT NOT NULL,
    CONSTRAINT oneOnOneIDFK FOREIGN KEY (oneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID)
)

-- Lo siguiente es correcto? es decir, si son dos llaves foraneas o debería de ser una llave compuesta?
-- y bueno, en general está bien? aunque creo que no pq no puse llave primaria jsjsjs
CREATE TABLE oneOnOneAnswers (
    answer VARCHAR(300) NOT NULL
    oneOnOneIDFK BIGINT NOT NULL,
    CONSTRAINT oneOnOneIDFK FOREIGN KEY (oneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID)
    questionsIDFK TINYINT NOT NULL,
    CONSTRAINT questionsIDFK FOREIGN KEY (questionsIDFK) REFERENCES oneOnOneQuestions(questionsID)
)