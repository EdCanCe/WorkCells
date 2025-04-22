
CREATE TABLE templateHoliday (
    templateHolidayID VARCHAR(40) NOT NULL PRIMARY KEY,
    holidayDate DATE NOT NULL,
    title VARCHAR(100)
);

CREATE TABLE usedHoliday (
    usedHolidayID VARCHAR(40) NOT NULL PRIMARY KEY,
    usedDate DATE NOT NULL,
    usedTemplateHolidayIDFK VARCHAR(40),
    CONSTRAINT usedTemplateHolidayIDFK FOREIGN KEY (usedTemplateHolidayIDFK) REFERENCES templateHoliday(templateHolidayID)
);

CREATE TABLE privilege (
    privilegeID VARCHAR(40) NOT NULL PRIMARY KEY,
    title VARCHAR(140) NOT NULL,
    summary VARCHAR(250)
);

CREATE TABLE role (
    roleID VARCHAR(40) NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE rolePrivilege (
    roleIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT roleIDFK FOREIGN KEY (roleIDFK) REFERENCES role(roleID),
    privilegeIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT privilegeIDFK FOREIGN KEY (privilegeIDFK) REFERENCES privilege(privilegeID)
);

CREATE TABLE country (
    countryID VARCHAR(40) NOT NULL PRIMARY KEY,
    title CHAR(50)
);

CREATE TABLE enterprise (
    enterpriseID VARCHAR(40) NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE department (
    departmentID VARCHAR(40) NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    flag BOOLEAN DEFAULT '1',
    enterpriseIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT enterpriseIDFK FOREIGN KEY (enterpriseIDFK) REFERENCES enterprise(enterpriseID)
);

CREATE TABLE user (
    userID VARCHAR(40) NOT NULL PRIMARY KEY,
    curp CHAR(18),
    rfc VARCHAR(13),
    birthName VARCHAR(50) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    mail VARCHAR(70) NOT NULL,
    passwd VARCHAR(70) NOT NULL,
    passwdFlag BOOLEAN NOT NULL,
    zipCode MEDIUMINT NOT NULL,
    houseNumber VARCHAR(13) NOT NULL,
    streetName VARCHAR(100),
    phoneNumber VARCHAR(15),
    colony VARCHAR(100),
    workModality TINYINT NOT NULL,
    workStatus BOOLEAN NOT NULL,
    userRoleIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT userRoleIDFK FOREIGN KEY (userRoleIDFK) REFERENCES role(roleID),
    countryUserIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT countryUserIDFK FOREIGN KEY (countryUserIDFK) REFERENCES country(countryID),
    prioritaryDepartmentIDFK VARCHAR(40),
    CONSTRAINT prioritaryDepartmentIDFK FOREIGN KEY (prioritaryDepartmentIDFK) REFERENCES department(departmentID) ON DELETE SET NULL
);

ALTER TABLE department 
ADD departmentLeaderIDFK VARCHAR(40);

ALTER TABLE department 
ADD CONSTRAINT departmentLeaderIDFK 
FOREIGN KEY (departmentLeaderIDFK) REFERENCES user(userID);

CREATE TABLE workStatus (
    workStatusID VARCHAR(40) NOT NULL PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE,
    userStatusIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT userStatusIDFK FOREIGN KEY (userStatusIDFK) REFERENCES user(userID)
);

/**
CREATE TABLE userDepartment (
    departmentIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT departmentIDFK FOREIGN KEY (departmentIDFK) REFERENCES department(departmentID),
    userIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);*/

CREATE TABLE vacation (
    vacationID VARCHAR(40) NOT NULL PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason VARCHAR(300),
    leaderStatus TINYINT DEFAULT 2,
    hrStatus TINYINT DEFAULT 2,
    vacationUserIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT vacationUserIDFK FOREIGN KEY (vacationUserIDFK) REFERENCES user(userID)
);

CREATE TABLE absence (
    absenceID VARCHAR(40) NOT NULL PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason VARCHAR(300),
    leaderStatus TINYINT DEFAULT 2,
    hrStatus TINYINT DEFAULT 2,
    absenceUserIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT absenceUserIDFK FOREIGN KEY (absenceUserIDFK) REFERENCES user(userID)
);

CREATE TABLE absenceMedia (
    absenceMediaID VARCHAR(40) NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(300) NOT NULL,
    absenceIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT absenceIDFK FOREIGN KEY (absenceIDFK) REFERENCES absence(absenceID)
);

CREATE TABLE oneOnOne (
    oneOnOneID VARCHAR(40) NOT NULL PRIMARY KEY,
    expectedTime TINYINT NOT NULL,
    meetingDate TIMESTAMP NOT NULL,
    meetingLink VARCHAR(50) NOT NULL,
    oneOnOneUserIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT oneOnOneUserIDFK FOREIGN KEY (oneOnOneUserIDFK) REFERENCES user(userID)
);

CREATE TABLE oneOnOneQuestion (
    questionID VARCHAR(40) NOT NULL PRIMARY KEY,
    question VARCHAR(300) NOT NULL
);

CREATE TABLE oneOnOneAnswer (
    answer VARCHAR(400) NOT NULL,
    answerOneOnOneIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT answerOneOnOneIDFK FOREIGN KEY (answerOneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID),
    questionIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT questionIDFK FOREIGN KEY (questionIDFK) REFERENCES oneOnOneQuestion(questionID)
);

CREATE TABLE oneOnOneMeasurable (
    measurableID VARCHAR(40) NOT NULL PRIMARY KEY,
    summary VARCHAR(300) NOT NULL
);

CREATE TABLE oneOnOneMeasure (
    evaluation int NOT NULL,
    measureOneOnOneIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT measureOneOnOneIDFK FOREIGN KEY (measureOneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID),
    measurableIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT measurableIDFK FOREIGN KEY (measurableIDFK) REFERENCES oneOnOneMeasurable(measurableID)
);

CREATE TABLE fault (
    faultID VARCHAR(40) NOT NULL PRIMARY KEY,
    doneDate DATE NOT NULL,
    summary VARCHAR(300),
    faultUserIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT faultUserIDFK FOREIGN KEY (faultUserIDFK) REFERENCES user(userID)
);

CREATE TABLE faultMedia (
    faultMediaID VARCHAR(40) NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(300) NOT NULL,
    faultIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT faultIDFK FOREIGN KEY (faultIDFK) REFERENCES fault(faultID)
);

/* 
Tablas de KPI

En caso de tener tiempo, agregar.

CREATE TABLE kpi (
    kpiID VARCHAR(40) NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    creationDate DATE NOT NULL,
    progress TINYINT NOT NULL,
    goal VARCHAR(300) NOT NULL,
    monthDuration TINYINT NOT NULL,
    kpiDepartmentIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT kpiDepartmentIDFK FOREIGN KEY (kpiDepartmentIDFK) REFERENCES department(departmentID),
    kpiUserIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT kpiUserIDFK FOREIGN KEY (kpiUserIDFK) REFERENCES user(userID)
);

CREATE TABLE evidence (
    evidenceID VARCHAR(40) NOT NULL PRIMARY KEY,
    summary VARCHAR(300) NOT NULL,
    uploadDate TIMESTAMP NOT NULL,
    evidenceKpiIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT evidenceKpiIDFK FOREIGN KEY (evidenceKpiIDFK) REFERENCES kpi(kpiID)
);

CREATE TABLE evidenceMedia (
    evidenceMediaID VARCHAR(40) NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(255) NOT NULL,
    evidenceIDFK VARCHAR(40) NOT NULL,
    CONSTRAINT evidenceIDFK FOREIGN KEY (evidenceIDFK) REFERENCES evidence(evidenceID)
); */