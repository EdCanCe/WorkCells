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
    CONSTRAINT kpiIDFK FOREIGN KEY (kpiID) REFERENCES kpi(kpiID),
);

CREATE TABLE evidenceMedia (
    evidenceMediaID INT NOT NULL PRIMARY KEY,
    mediaLink VARCHAR(255)
    evidenceIDFK INT NOT NULL PRIMARY KEY,
    CONSTRAINT evidenceIDFK FOREIGN KEY (evidenceID) REFERENCES evidence(evidenceID)
);



END

-- create table User(
--     ID_User bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     Password_User varchar(220) NOT NULL,
--     Name_User varchar(25) NOT NULL,
--     LastName_User varchar(60),
--     BirthDate_User date NOT NULL,
--     Username_User varchar(20) NOT NULL,
--     Administrator_User tinyint NOT NULL,
--     Description_User varchar(250)
-- );

-- create table Routine(
--     ID_Routine bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     FKID_User_Routine bigint NOT NULL,
--     CONSTRAINT FKID_User_Routine FOREIGN KEY (FKID_User_Routine) REFERENCES User(ID_User),
--     Name_Routine varchar(30) NOT NULL
-- );

-- create table Exercise(
--     ID_Exercise bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     Name_Exercise varchar(30) NOT NULL,
--     Description_Exercise text(500) NOT NULL
-- );

-- create table RoutineExercise (
--     ID_RoutineExercise bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     FKID_Routine_RoutineExercise bigint NOT NULL,
--     CONSTRAINT FKID_Routine_RoutineExercise FOREIGN KEY (FKID_Routine_RoutineExercise) REFERENCES Routine(ID_Routine),
--     FK_Exercise_RoutineExercise bigint NOT NULL,
--     CONSTRAINT FK_Exercise_RoutineExercise FOREIGN KEY (FK_Exercise_RoutineExercise) REFERENCES Exercise(ID_Exercise)
-- );