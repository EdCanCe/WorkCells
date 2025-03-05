
CREATE TABLE templateHoliday (
    templateHolidayID SMALLINT AUTO_INCREMENT PRIMARY KEY,
    holidayDate DATE NOT NULL,
    title VARCHAR(100)
);

CREATE TABLE usedHoliday (
    templateHolidayID SMALLINT AUTO_INCREMENT PRIMARY KEY,
    usedDate DATE NOT NULL,
    usedTemplateHolidayID SMALLINT NOT NULL,
    CONSTRAINT usedTemplateHolidayID FOREIGN KEY (usedTemplateHolidayID) REFERENCES templateHoliday(templateHolidayID)
);

CREATE TABLE privilege (
    privilegeID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(150)
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

CREATE TABLE country (
    countryID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title CHAR(50)
);

CREATE TABLE user (
    userID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    birthName VARCHAR(50) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    mail VARCHAR(70) NOT NULL,
    passwd VARCHAR(70) NOT NULL,
    passwdFlag BOOLEAN NOT NULL,
    zipCode MEDIUMINT NOT NULL,
    houseNumber VARCHAR(13) NOT NULL,
    streetName VARCHAR(100),
    colony VARCHAR(100),
    workModality TINYINT NOT NULL,
    workStatus BOOLEAN NOT NULL,
    userRoleIDFK TINYINT NOT NULL,
    CONSTRAINT userRoleIDFK FOREIGN KEY (userRoleIDFK) REFERENCES role(roleID),
    countryUserIDFK TINYINT NOT NULL,
    CONSTRAINT countryUserIDFK FOREIGN KEY (countryUserIDFK) REFERENCES country(countryID)
);

CREATE TABLE workStatus (
    workStatusID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE,
    userStatusIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userStatusIDFK FOREIGN KEY (userStatusIDFK) REFERENCES user(userID)
);

CREATE TABLE enterprise (
    enterpriseID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL
);

CREATE TABLE department (
    departmentID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    enterpriseIDFK TINYINT NOT NULL,
    CONSTRAINT enterpriseIDFK FOREIGN KEY (enterpriseIDFK) REFERENCES enterprise(enterpriseID)
);

CREATE TABLE userDepartment (
    isPriority BOOL NOT NULL,
    departmentIDFK TINYINT NOT NULL,
    CONSTRAINT departmentIDFK FOREIGN KEY (departmentIDFK) REFERENCES department(departmentID),
    userIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE kpi (
    kpiID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
    evidenceID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    summary VARCHAR(300) NOT NULL,
    uploadDate TIMESTAMP NOT NULL,
    evidenceKpiIDFK INT NOT NULL,
    CONSTRAINT evidenceKpiIDFK FOREIGN KEY (evidenceKpiIDFK) REFERENCES kpi(kpiID)
);

CREATE TABLE evidenceMedia (
    evidenceMediaID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mediaLink VARCHAR(255) NOT NULL,
    evidenceIDFK INT NOT NULL,
    CONSTRAINT evidenceIDFK FOREIGN KEY (evidenceIDFK) REFERENCES evidence(evidenceID)
);

CREATE TABLE vacation (
    vacationID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason VARCHAR(300),
    leaderStatus BOOLEAN NOT NULL,
    hrStatus BOOLEAN NOT NULL,
    vacationUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT vacationUserIDFK FOREIGN KEY (vacationUserIDFK) REFERENCES user(userID)
);

CREATE TABLE absence (
    absenceID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason VARCHAR(300),
    justified BOOLEAN NOT NULL,
    absenceUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT absenceUserIDFK FOREIGN KEY (absenceUserIDFK) REFERENCES user(userID)
);

CREATE TABLE absenceMedia (
    absenceMediaID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mediaLink VARCHAR(300) NOT NULL,
    absenceIDFK INT NOT NULL,
    CONSTRAINT absenceIDFK FOREIGN KEY (absenceIDFK) REFERENCES absence(absenceID)
);

CREATE TABLE oneOnOne (
    oneOnOneID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    expectedTime TINYINT NOT NULL,
    meetingDate TIMESTAMP NOT NULL,
    oneOnOneUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT oneOnOneUserIDFK FOREIGN KEY (oneOnOneUserIDFK) REFERENCES user(userID)
);

CREATE TABLE oneOnOneQuestion (
    questionID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(300) NOT NULL
);

CREATE TABLE oneOnOneAnswer (
    answer VARCHAR(400) NOT NULL,
    answerOneOnOneIDFK INT NOT NULL,
    CONSTRAINT answerOneOnOneIDFK FOREIGN KEY (answerOneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID),
    questionIDFK TINYINT NOT NULL,
    CONSTRAINT questionIDFK FOREIGN KEY (questionIDFK) REFERENCES oneOnOneQuestion(questionID)
);

CREATE TABLE oneOnOneMeasurable (
    measurableID TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    summary VARCHAR(300) NOT NULL
);

CREATE TABLE oneOnOneMeasure (
    evaluation TINYINT NOT NULL,
    measureOneOnOneIDFK INT NOT NULL,
    CONSTRAINT measureOneOnOneIDFK FOREIGN KEY (measureOneOnOneIDFK) REFERENCES oneOnOne(oneOnOneID),
    measurableIDFK TINYINT NOT NULL,
    CONSTRAINT measurableIDFK FOREIGN KEY (measurableIDFK) REFERENCES oneOnOneMeasurable(measurableID)
);

CREATE TABLE fault (
    faultID SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    doneDate DATE NOT NULL,
    summary VARCHAR(300),
    faultUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT faultUserIDFK FOREIGN KEY (faultUserIDFK) REFERENCES user(userID)
);