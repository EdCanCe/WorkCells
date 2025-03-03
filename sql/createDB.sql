
CREATE TABLE holiday (
    holidayDate TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE privilege (
    privilegeID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(300)
);

CREATE TABLE role (
    roleID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE rolePrivilege (
    roleIDFK TINYINT NOT NULL,
    CONSTRAINT roleIDFK FOREIGN KEY (roleIDFK) REFERENCES role(roleID),
    privilegeIDFK TINYINT NOT NULL,
    CONSTRAINT privilegeIDFK FOREIGN KEY (privilegeIDFK) REFERENCES privilege(privilegeID)
);

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
    birthName VARCHAR(50) NOT NULL,
    workModality TINYINT NOT NULL,
    workStatus BOOLEAN NOT NULL,
    userRoleIDFK TINYINT NOT NULL,
    CONSTRAINT userRoleIDFK FOREIGN KEY (userRoleIDFK) REFERENCES role(roleID)
);

CREATE TABLE workStatus (
    workStatusID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE,
    userStatusIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userStatusIDFK FOREIGN KEY (userStatusIDFK) REFERENCES user(userID)
);

CREATE TABLE enterprise (
    enterpriseID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE department (
    departmentID TINYINT NOT NULL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    enterpriseIDFK TINYINT NOT NULL,
    CONSTRAINT enterpriseIDFK FOREIGN KEY (enterpriseIDFK) REFERENCES enterprise(enterpriseID)
);

CREATE TABLE userDepartment (
    userIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID),
    departmentIDFK TINYINT NOT NULL,
    CONSTRAINT departmentIDFK FOREIGN KEY (departmentIDFK) REFERENCES department(departmentID)
);

CREATE TABLE kpi (
    kpiID INT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    creationDate DATE NOT NULL,
    progress TINYINT NOT NULL,
    goal VARCHAR(300) NOT NULL,
    monthDuration TINYINT NOT NULL,
    kpiDepartmentIDFK TINYINT NOT NULL,
    CONSTRAINT kpiDepartmentIDFK FOREIGN KEY (kpiDepartmentIDFK) REFERENCES department(departmentID),
    kpiUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT kpiUserIDFK FOREIGN KEY (kpiUserIDFK) REFERENCES user(userID)
);

CREATE TABLE evidence (
    evidenceID INT NOT NULL PRIMARY KEY,
    summary VARCHAR(300) NOT NULL,
    uploadDate TIMESTAMP NOT NULL,
    evidenceKpiIDFK INT NOT NULL,
    CONSTRAINT evidenceKpiIDFK FOREIGN KEY (evidenceKpiIDFK) REFERENCES kpi(kpiID)
);

CREATE TABLE evidenceMedia (
    evidenceMediaID INT NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(255) NOT NULL,
    evidenceIDFK INT NOT NULL,
    CONSTRAINT evidenceIDFK FOREIGN KEY (evidenceIDFK) REFERENCES evidence(evidenceID)
);

CREATE TABLE vacation (
    vacationID INT NOT NULL PRIMARY KEY,
    leaderStatus BOOLEAN NOT NULL,
    reason VARCHAR(300),
    hrStatus BOOLEAN NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    vacationUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT vacationUserIDFK FOREIGN KEY (vacationUserIDFK) REFERENCES user(userID)
);

CREATE TABLE absence (
    absenceID INT NOT NULL PRIMARY KEY,
    reason VARCHAR(300),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    justified BOOLEAN NOT NULL,
    absenceUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT absenceUserIDFK FOREIGN KEY (absenceUserIDFK) REFERENCES user(userID)
);

CREATE TABLE absenceMedia (
    absenceMediaID INT NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(255) NOT NULL,
    absenceIDFK INT NOT NULL,
    CONSTRAINT absenceIDFK FOREIGN KEY (absenceIDFK) REFERENCES absence(absenceID)
);

CREATE TABLE oneOnOne (
    oneOnOneID INT NOT NULL PRIMARY KEY,
    meetingDate TIMESTAMP NOT NULL,
    expectedTime TINYINT NOT NULL,
    oneOnOneUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT oneOnOneUserIDFK FOREIGN KEY (oneOnOneUserIDFK) REFERENCES user(userID)
);

CREATE TABLE oneOnOneQuestion (
    questionID TINYINT NOT NULL PRIMARY KEY,
    question VARCHAR(300) NOT NULL
);

CREATE TABLE oneOnOneAnswer (
    answer VARCHAR(300) NOT NULL,
    oneOnOneIDFK INT NOT NULL,
    CONSTRAINT oneOnOneIDFK FOREIGN KEY (oneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID),
    questionIDFK TINYINT NOT NULL,
    CONSTRAINT questionIDFK FOREIGN KEY (questionIDFK) REFERENCES oneOnOneQuestion(questionID)
);