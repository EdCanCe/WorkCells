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

CREATE TABLE workStatus (
    workStatusID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dateOfBegin DATE NOT NULL,
    dateOfEnd DATE
);

CREATE TABLE enterprise (
    enterpriseID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE departament (
    departamentID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE kpi (
    kpiID INT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    creationDate DATE NOT NULL,
    progress TINYINT NOT NULL,
    goal VARCHAR(300) NOT NULL,
    monthDuration TINYINT NOT NULL
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