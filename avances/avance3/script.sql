
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
    title VARCHAR(140) NOT NULL,
    summary VARCHAR(250)
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

CREATE TABLE user (
    userID MEDIUMINT NOT NULL PRIMARY KEY,
    curp CHAR(18) NOT NULL,
    rfc VARCHAR(13) NOT NULL,
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
    CONSTRAINT countryUserIDFK FOREIGN KEY (countryUserIDFK) REFERENCES country(countryID),
    prioritaryDepartmentFK TINYINT,
    CONSTRAINT prioritaryDepartmentFK FOREIGN KEY (prioritaryDepartmentFK) REFERENCES department(departmentID)
);

CREATE TABLE workStatus (
    workStatusID MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE,
    userStatusIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userStatusIDFK FOREIGN KEY (userStatusIDFK) REFERENCES user(userID)
);

CREATE TABLE userDepartment (
    departmentIDFK TINYINT NOT NULL,
    CONSTRAINT departmentIDFK FOREIGN KEY (departmentIDFK) REFERENCES department(departmentID),
    userIDFK MEDIUMINT NOT NULL,
    CONSTRAINT userIDFK FOREIGN KEY (userIDFK) REFERENCES user(userID)
);

CREATE TABLE vacation (
    vacationID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason VARCHAR(300),
    leaderStatus TINYINT NOT NULL,
    hrStatus TINYINT NOT NULL,
    vacationUserIDFK MEDIUMINT NOT NULL,
    CONSTRAINT vacationUserIDFK FOREIGN KEY (vacationUserIDFK) REFERENCES user(userID)
);

CREATE TABLE absence (
    absenceID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    reason VARCHAR(300),
    justified TINYINT NOT NULL,
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

INSERT INTO privilege(title, summary) values('Colaborador consulta ausencias', 'Colaborador consulta ausencias.'); 
INSERT INTO privilege(title, summary) values('Colaborador consulta calendario', 'Colaborador consulta calendario.'); 
INSERT INTO privilege(title, summary) values('Colaborador consulta días feriados', 'Colaborador consulta días feriados.'); 
INSERT INTO privilege(title, summary) values('Colaborador consulta falta administrativa', 'Colaborador consulta falta administrativa'); 
INSERT INTO privilege(title, summary) values('Colaborador consulta KPIs', 'Colaborador consulta KPIs.'); 
INSERT INTO privilege(title, summary) values('Colaborador consulta perfil', 'Colaborador consulta perfil.'); 
INSERT INTO privilege(title, summary) values('Colaborador consulta sesión del One-On-One', 'Colaborador consulta sesión del One-On-One.'); 
INSERT INTO privilege(title, summary) values('Colaborador consulta solicitudes de vacaciones', 'Colaborador consulta solicitudes de vacaciones.'); 
INSERT INTO privilege(title, summary) values('Colaborador elimina solicitud de vacaciones', 'Colaborador elimina solicitud de vacaciones.'); 
INSERT INTO privilege(title, summary) values('Colaborador modifica contraseña temporal', 'Colaborador modifica contraseña temporal.'); 
INSERT INTO privilege(title, summary) values('Colaborador modifica solicitud de vacaciones', 'Colaborador modifica solicitud de vacaciones.'); 
INSERT INTO privilege(title, summary) values('Colaborador registra ausencia', 'Colaborador registra ausencia.'); 
INSERT INTO privilege(title, summary) values('Colaborador registra evidencia de KPI', 'Colaborador registra evidencia de KPI.'); 
INSERT INTO privilege(title, summary) values('Colaborador registra inicio de sesión', 'Colaborador registra inicio de sesión.'); 
INSERT INTO privilege(title, summary) values('Colaborador registra solicitud de vacaciones', 'Colaborador registra solicitud de vacaciones.'); 
INSERT INTO privilege(title, summary) values('Líder consulta ausencias de colaborador', 'Líder consulta ausencias de colaborador.'); 
INSERT INTO privilege(title, summary) values('Líder consulta colaboradores en su departamento', 'Líder consulta colaboradores en su departamento.'); 
INSERT INTO privilege(title, summary) values('Líder consulta KPIs de colaborador', 'Líder consulta KPIs de colaborador.'); 
INSERT INTO privilege(title, summary) values('Líder consulta perfil de colaboradores', 'Líder consulta perfil de colaboradores.'); 
INSERT INTO privilege(title, summary) values('Líder consulta solicitudes de vacaciones de colaborador', 'Líder consulta solicitudes de vacaciones de colaborador.'); 
INSERT INTO privilege(title, summary) values('Líder elimina KPIs de colaborador', 'Líder elimina KPIs de colaborador.'); 
INSERT INTO privilege(title, summary) values('Líder modifica KPIs de colaborador', 'Líder modifica KPIs de colaborador.'); 
INSERT INTO privilege(title, summary) values('Líder registra KPIs de colaborador', 'Líder registra KPIs de colaborador.'); 
INSERT INTO privilege(title, summary) values('Líder registra respuesta hacia ausencia de colaborador', 'Líder registra respuesta hacia ausencia de colaborador.'); 
INSERT INTO privilege(title, summary) values('Líder registra respuesta hacia solicitud de vacaciones de colaborador', 'Líder registra respuesta hacia solicitud de vacaciones de colaborador.'); 
INSERT INTO privilege(title, summary) values('Superadmin consulta ausencias de empleado', 'Superadmin consulta ausencias de empleado.'); 
INSERT INTO privilege(title, summary) values('Superadmin consulta empleados activos', 'Superadmin consulta empleados activos.'); 
INSERT INTO privilege(title, summary) values('Superadmin consulta empleados inactivos', 'Superadmin consulta empleados inactivos.'); 
INSERT INTO privilege(title, summary) values('Superadmin consulta reporte de rotación de empleos mensual', 'Superadmin consulta reporte de rotación de empleos mensual.'); 
INSERT INTO privilege(title, summary) values('Superadmin consulta sesión del One-On-One', 'Superadmin consulta sesión del One-On-One'); 
INSERT INTO privilege(title, summary) values('Superadmin consulta solicitudes de vacaciones de empleado', 'Superadmin consulta solicitudes de vacaciones de empleado.'); 
INSERT INTO privilege(title, summary) values('Superadmin elimina departamento', 'Superadmin elimina departamento.'); 
INSERT INTO privilege(title, summary) values('Superadmin Elimina día feriado', 'Superadmin elimina día feriado.'); 
INSERT INTO privilege(title, summary) values('Superadmin elimina falta administrativa', 'Superadmin elimina falta administrativa.'); 
INSERT INTO privilege(title, summary) values('Superadmin Elimina Kpi de líder', 'Superadmin elimina Kpi de líder.'); 
INSERT INTO privilege(title, summary) values('Superadmin modifica datos de empleado', 'Superadmin modifica datos de empleado.'); 
INSERT INTO privilege(title, summary) values('Superadmin modifica departamento', 'Superadmin modifica departamento.'); 
INSERT INTO privilege(title, summary) values('Superadmin Modifica día feriado', 'Superadmin modifica día feriado.'); 
INSERT INTO privilege(title, summary) values('Superadmin modifica falta administrativa', 'Superadmin modifica falta administrativa.'); 
INSERT INTO privilege(title, summary) values('Superadmin Modifica Kpi de líder', 'Superadmin modifica Kpi de líder.'); 
INSERT INTO privilege(title, summary) values('Superadmin registra alta de empleado', 'Superadmin registra alta de empleado.'); 
INSERT INTO privilege(title, summary) values('Superadmin registra baja de empleado', 'Superadmin registra baja de empleado.'); 
INSERT INTO privilege(title, summary) values('Superadmin registra datos del One-On-One', 'Superadmin registra datos del One-On-One.'); 
INSERT INTO privilege(title, summary) values('Superadmin registra departamento', 'Superadmin registra departamento.'); 
INSERT INTO privilege(title, summary) values('Superadmin Registra día feriado', 'Superadmin registra día feriado'); 
INSERT INTO privilege(title, summary) values('Superadmin registra falta administrativa', 'Superadmin registra falta administrativa.'); 
INSERT INTO privilege(title, summary) values('Superadmin registra fecha prevista de One-On-One', 'Superadmin registra fecha prevista de One-On-One.'); 
INSERT INTO privilege(title, summary) values('Superadmin Registra Kpi de líder', 'Superadmin registra Kpi de líder.'); 
INSERT INTO privilege(title, summary) values('Superadmin registra respuesta hacia ausencia de empleado', 'Superadmin registra respuesta hacia ausencia de empleado.'); 
INSERT INTO privilege(title, summary) values('Superadmin registra respuesta hacia solicitud de vacaciones de empleado', 'Superadmin registra respuesta hacia solicitud de vacaciones de empleado.'); 

INSERT INTO role(title) values('Colaborator'); 
INSERT INTO role(title) values('Department Leader'); 
INSERT INTO role(title) values('Human Resources'); 

INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 1); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 2); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 3); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 4); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 5); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 6); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 7); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 8); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 9); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 10); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 11); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 12); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 13); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 14); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 15); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 1); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 2); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 3); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 4); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 5); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 6); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 7); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 8); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 9); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 10); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 11); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 12); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 13); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 14); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 15); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 16); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 17); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 18); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 19); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 20); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 21); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 22); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 23); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 24); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 25); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 1); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 2); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 3); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 4); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 5); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 6); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 7); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 8); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 9); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 10); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 11); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 12); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 13); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 14); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 15); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 16); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 17); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 18); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 19); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 20); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 21); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 22); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 23); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 24); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 25); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 26); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 27); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 28); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 29); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 30); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 31); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 32); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 33); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 34); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 35); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 36); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 37); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 38); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 39); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 40); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 41); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 42); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 43); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 44); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 45); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 46); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 47); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 48); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 49); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 50); 

INSERT INTO country(title) values('Mexico'); 
INSERT INTO country(title) values('United States'); 
INSERT INTO country(title) values('Colombia'); 
INSERT INTO country(title) values('Argentina'); 

INSERT INTO enterprise(title) values('Apple'); 
INSERT INTO enterprise(title) values('Meta'); 
INSERT INTO enterprise(title) values('Microsoft'); 
INSERT INTO enterprise(title) values('Open IA'); 
INSERT INTO enterprise(title) values('Nvidia'); 
INSERT INTO enterprise(title) values('Amazon'); 
INSERT INTO enterprise(title) values('Oracle'); 

INSERT INTO department(enterpriseIDFK, title) values(7, 'Finanzas'); 
INSERT INTO department(enterpriseIDFK, title) values(4, 'TI'); 
INSERT INTO department(enterpriseIDFK, title) values(1, 'Producción'); 
INSERT INTO department(enterpriseIDFK, title) values(6, 'Marketing'); 
INSERT INTO department(enterpriseIDFK, title) values(3, 'Atencion al cliene'); 
INSERT INTO department(enterpriseIDFK, title) values(2, 'Legal'); 
INSERT INTO department(enterpriseIDFK, title) values(5, 'RRHH'); 
INSERT INTO department(enterpriseIDFK, title) values(7, 'TI'); 
INSERT INTO department(enterpriseIDFK, title) values(6, 'TI'); 
INSERT INTO department(enterpriseIDFK, title) values(7, 'Finanzas'); 
INSERT INTO department(enterpriseIDFK, title) values(5, 'Marketing'); 
INSERT INTO department(enterpriseIDFK, title) values(2, 'Legal'); 
INSERT INTO department(enterpriseIDFK, title) values(5, 'Logística'); 
INSERT INTO department(enterpriseIDFK, title) values(2, 'Logística'); 
INSERT INTO department(enterpriseIDFK, title) values(5, 'Marketing'); 
INSERT INTO department(enterpriseIDFK, title) values(3, 'Ventas'); 
INSERT INTO department(enterpriseIDFK, title) values(5, 'Finanzas'); 
INSERT INTO department(enterpriseIDFK, title) values(6, 'TI'); 
INSERT INTO department(enterpriseIDFK, title) values(2, 'Logística'); 
INSERT INTO department(enterpriseIDFK, title) values(6, 'Atencion al cliene'); 
INSERT INTO department(enterpriseIDFK, title) values(6, 'Marketing'); 
INSERT INTO department(enterpriseIDFK, title) values(7, 'TI'); 
INSERT INTO department(enterpriseIDFK, title) values(6, 'Producción'); 
INSERT INTO department(enterpriseIDFK, title) values(1, 'Finanzas'); 
INSERT INTO department(enterpriseIDFK, title) values(7, 'Producción'); 

INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1666834, 'RUGP2017MTLKYS41', 'RUGP2017MTU8', 'Pedro', 'Ruiz González', 'mplidhfncndug@nuclea.solutions', 'saaknihyfkprk', TRUE, 47175, '704.A', 'Avenida de la Luz', 'Colonia Santa Fe', 2, FALSE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1411276, 'MOFA4612MGTCIN41', 'MOFA4612MGD9', 'Antonio', 'Moreno Fernández', 'ibgxoqdtpoew@nuclea.solutions', 'bqcytlmge', TRUE, 90706, '196.C', 'Calle de la Luna', 'Colonia San Francisco', 0, TRUE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2887299, 'MAMR21114HBCEGF33', 'MAMR21114HM4', 'Rafael', 'Martínez Martínez', 'etocbbxyhwu@gmail.com', 'udumhnget', TRUE, 82255, '777.B', 'Calle de los Naranjos', 'Colonia La Pradera', 1, TRUE, 2, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5160457, 'JIGS2721MPLTSY85', 'JIGS2721MPH2', 'Susana', 'Jiménez González', 'pwnervhpinmt@gmail.com', 'ctvadfihspxm', FALSE, 32106, '951.A', 'Calle del Carmen', 'Colonia del Sol', 1, FALSE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4486255, 'MOHA01117MZSMFE10', 'MOHA01117MH9', 'Antonio', 'Moreno Hernández', 'dgnxguplvqhm@outlook.com', 'docklvbrkgw', TRUE, 97723, '694.A', 'Avenida de la Solidaridad', 'Colonia El Cerrito', 0, FALSE, 2, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7346965, 'TOHP212MJCXGM95', 'TOHP212MJCE7', 'Patricia', 'Torres Hernández', 'yqnkqtktgjm@outlook.com', 'pmtmelmhtjm', FALSE, 26782, '796.A', 'Calle de la Luna', 'Colonia Santa Rosa', 0, TRUE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1985896, 'ROMF0112HYNFXJ86', 'ROMF0112HYQ7', 'Francisco', 'Rodríguez Moreno', 'ullipvxluayom@outlook.com', 'aoqhsdlmu', TRUE, 14232, '923.C', 'Calle de la Reforma', 'Colonia Las Águilas', 0, TRUE, 3, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7169208, 'FEMM428HQTVLR87', 'FEMM428HQTM2', 'María', 'Fernández Martínez', 'laviacaxtpxl@outlook.com', 'fxrvkpqid', FALSE, 46530, '505.C', 'Avenida de la Constitución', 'Colonia Las Águilas', 2, FALSE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(8356463, 'TORE4417HBSJOD46', 'TORE4417HBB4', 'Elena', 'Torres Ruiz', 'xuebwqoyi@gmail.com', 'aecbgmucjg', FALSE, 97714, '638.A', 'Calle Allende', 'Colonia El Mirador', 2, FALSE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6934954, 'MORL1109HGTVOP23', 'MORL1109HGF2', 'Laura', 'Moreno Rodríguez', 'tlmmgno@nuclea.solutions', 'hrfliqdmrx', TRUE, 21606, '905.B', 'Calle Corregidora', 'Colonia Valle Verde', 2, TRUE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4700400, 'MOTJ2628HSLNLH84', 'MOTJ2628HSJ9', 'José', 'Moreno Torres', 'nrcmtnyp@gmail.com', 'esfcavx', TRUE, 14398, '548.B', 'Calle de la Amistad', 'Colonia Reforma', 2, TRUE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3569605, 'FEML2219HGTDHF93', 'FEML2219HGF0', 'Laura', 'Fernández Moreno', 'fycoerr@gmail.com', 'anqmtvayehksp', TRUE, 90799, '53.B', 'Calle del Sol', 'Colonia Los Ángeles', 3, TRUE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(8213764, 'JIHF0228MHGRUP98', 'JIHF0228MHR2', 'Francisco', 'Jiménez Hernández', 'kjgcmdapflx@nuclea.solutions', 'fppgootijk', FALSE, 22056, '832.A', 'Calle Guerrero', 'Colonia Santa Fe', 2, TRUE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6141366, 'FEFA140MOCIXC87', 'FEFA140MOCN6', 'Ana', 'Fernández Fernández', 'rdyxbrmbxfdtf@nuclea.solutions', 'wtqvptptnx', TRUE, 96683, '785.A', 'Calle de la Corregidora', 'Colonia La Pradera', 2, FALSE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(8313776, 'GOJE01018HCLXOL81', 'GOJE01018HR3', 'Enrique', 'González Jiménez', 'rllxjuejvwlu@outlook.com', 'xbcwojtulg', FALSE, 96572, '545.A', 'Avenida Morelos', 'Colonia Morelos', 2, FALSE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2528964, 'GORJ1719HDGJNN33', 'GORJ1719HDG8', 'Javier', 'González Rodríguez', 'vpueigxpqb@gmail.com', 'nleepwui', TRUE, 36645, '550.C', 'Avenida Morelos', 'Colonia Las Águilas', 2, FALSE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(8300847, 'TOGR4124HSLCIE34', 'TOGR4124HSY3', 'Roberto', 'Torres González', 'mitoojrbtlil@nuclea.solutions', 'iidwptxk', FALSE, 66715, '792.C', 'Calle Guerrero', 'Colonia El Laurel', 2, TRUE, 2, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2952784, 'JIMJ0824HASRYK78', 'JIMJ0824HAI6', 'José', 'Jiménez Moreno', 'ymoxusxajjpu@yahoo.com', 'dhkplpcdpnko', FALSE, 20948, '148.A', 'Calle de la Paz', 'Colonia del Sol', 2, FALSE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5788471, 'FEHF161HDGMJU39', 'FEHF161HDGM9', 'Francisco', 'Fernández Hernández', 'cgfprhep@nuclea.solutions', 'ndmeikarwjmbl', TRUE, 92587, '792.C', 'Calle Corregidora', 'Colonia Santa Fe', 1, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2963952, 'GOGJ0106HGTMPT29', 'GOGJ0106HGW3', 'José', 'González González', 'hgmbqpkffhvx@yahoo.com', 'ccvdduoqff', FALSE, 22283, '959.C', 'Avenida Morelos', 'Colonia Los Ángeles', 0, TRUE, 2, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6161968, 'MARB1317MTCDXC40', 'MARB1317MTW7', 'Beatriz', 'Martínez Ruiz', 'cgbrdxx@yahoo.com', 'xnxyafwdgb', TRUE, 34568, '898.C', 'Calle Juárez', 'Colonia Nuevo Milenio', 2, TRUE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4275065, 'FEFA3103MQTNWW77', 'FEFA3103MQR1', 'Antonio', 'Fernández Fernández', 'dbnixit@outlook.com', 'mgbmigighjf', FALSE, 25738, '178.A', 'Calle de la Luna', 'Colonia El Campanario', 0, FALSE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5124017, 'HEFE2823MOCOOF32', 'HEFE2823MOI4', 'Enrique', 'Hernández Fernández', 'ifqyvvvvlbghl@yahoo.com', 'dmjnoeu', FALSE, 49908, '431.C', 'Calle del Sol', 'Colonia San José', 3, FALSE, 3, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4766730, 'RUJI1213HJCBLN90', 'RUJI1213HJN5', 'Isabel', 'Ruiz Jiménez', 'jinwptvcss@yahoo.com', 'cyjrtvrsts', TRUE, 77786, '930.B', 'Calle de la Esperanza', 'Colonia Santa Rosa', 2, FALSE, 2, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4828217, 'TOGR285MSRKBU88', 'TOGR285MSRT8', 'Roberto', 'Torres González', 'mdsaefk@gmail.com', 'agjkwmpiolmm', FALSE, 31668, '785.C', 'Calle de los Naranjos', 'Colonia El Campanario', 3, FALSE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4399563, 'MOHJ4315MASGCN75', 'MOHJ4315MAE9', 'Javier', 'Moreno Hernández', 'krjutai@nuclea.solutions', 'urxospiaqo', FALSE, 62972, '112.B', 'Avenida Constituyentes', 'Colonia El Laurel', 0, TRUE, 1, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(963206, 'FEHM2715HVZHYB29', 'FEHM2715HVS9', 'Mercedes', 'Fernández Hernández', 'tycwnndvong@nuclea.solutions', 'vfovxuxnk', FALSE, 34970, '981.C', 'Calle Hidalgo', 'Colonia Santa Rosa', 3, FALSE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7653261, 'MOTS3914HOCQOD57', 'MOTS3914HOU0', 'Susana', 'Moreno Torres', 'voncqrlmvvh@nuclea.solutions', 'akacvkffd', FALSE, 46621, '191.B', 'Calle Hidalgo', 'Colonia Nuevo Milenio', 0, TRUE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7709944, 'FEHR2928MZSQNN37', 'FEHR2928MZY8', 'Rafael', 'Fernández Hernández', 'aplsoevdq@outlook.com', 'wmsytocbhrqgk', TRUE, 87752, '669.C', 'Calle Benito Juárez', 'Colonia del Sol', 0, FALSE, 1, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7856016, 'MOGM0123MSLDPC14', 'MOGM0123MSB1', 'Mercedes', 'Moreno González', 'qkeauorwxc@gmail.com', 'vcmgcjkdx', FALSE, 47750, '811.C', 'Calle de los Naranjos', 'Colonia Santa Fe', 1, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5457001, 'FEGE2524MNTLIW86', 'FEGE2524MNJ7', 'Elena', 'Fernández González', 'swuwsjmuyan@outlook.com', 'orespjydu', FALSE, 17686, '297.A', 'Avenida de la Juventud', 'Colonia Reforma', 2, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(871052, 'HERD0115MGTSQN92', 'HERD0115MGI1', 'David', 'Hernández Rodríguez', 'vvvoltcn@yahoo.com', 'gjeolkyo', TRUE, 33470, '180.B', 'Calle de los Naranjos', 'Colonia La Pradera', 1, TRUE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5362506, 'GORM1115HQROFL35', 'GORM1115HQW2', 'Mercedes', 'González Ruiz', 'nknhktqr@gmail.com', 'wsxhlspg', FALSE, 29906, '936.C', 'Calle del Sol', 'Colonia El Cerrito', 3, FALSE, 2, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(713880, 'HEHR3620MCHSEA79', 'HEHR3620MCB9', 'Rafael', 'Hernández Hernández', 'ctyeofetxa@yahoo.com', 'uognhti', TRUE, 87237, '526.C', 'Avenida Universidad', 'Colonia Lomas de Querétaro', 0, TRUE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7391948, 'JITE2920HQRYQK42', 'JITE2920HQB7', 'Elena', 'Jiménez Torres', 'towpuxp@nuclea.solutions', 'ajjubmhtljetg', FALSE, 20859, '852.C', 'Calle de la Luna', 'Colonia El Mirador', 1, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4620447, 'MOTS1727HTLITE25', 'MOTS1727HTJ3', 'Susana', 'Moreno Torres', 'kofqtljd@yahoo.com', 'aoxnahnxdn', TRUE, 23928, '967.A', 'Avenida Morelos', 'Colonia Nuevo Milenio', 1, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3614713, 'GORA1113HZSOWS51', 'GORA1113HZW4', 'Ana', 'González Ruiz', 'xyyvjqwjoktc@yahoo.com', 'vyklosnh', FALSE, 60344, '664.B', 'Avenida Revolución', 'Colonia Emiliano Zapata', 1, FALSE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1469403, 'MAFR21110HQRAIF49', 'MAFR21110HS0', 'Roberto', 'Martínez Fernández', 'jiforrcadod@outlook.com', 'tyfemblver', TRUE, 42988, '296.B', 'Calle de la Paz', 'Colonia Jardines de Querétaro', 2, FALSE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3374197, 'HETJ2110MQTUKU63', 'HETJ2110MQE9', 'José', 'Hernández Torres', 'jgxhhcmdpchvl@yahoo.com', 'xlevxpni', TRUE, 68465, '404.C', 'Calle Juárez', 'Colonia San José', 2, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3779211, 'JIJM0415HNTRYH76', 'JIJM0415HNU7', 'Mercedes', 'Jiménez Jiménez', 'abbbkeoepcfg@outlook.com', 'fsnwfgm', TRUE, 67780, '327.C', 'Calle de los Pinos', 'Colonia La Pradera', 1, FALSE, 1, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1982145, 'JIML3120MSRXXM83', 'JIML3120MSK0', 'Laura', 'Jiménez Moreno', 'pnancsri@gmail.com', 'nthitxkmekns', TRUE, 39023, '664.C', 'Calle Juárez', 'Colonia Lomas de Querétaro', 3, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7291902, 'TOMI024HZSNDE82', 'TOMI024HZST0', 'Isabel', 'Torres Martínez', 'kbtajodsu@gmail.com', 'kbwtucnjhs', FALSE, 64539, '640.A', 'Avenida de la Constitución', 'Colonia del Sol', 0, FALSE, 2, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4772088, 'MOFA1718MCMOKT82', 'MOFA1718MCV0', 'Ana', 'Moreno Fernández', 'qbqyxagqk@nuclea.solutions', 'dvksdxkxmcmw', TRUE, 21000, '701.C', 'Avenida de la Solidaridad', 'Colonia El Campanario', 2, TRUE, 1, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(962624, 'GORL41129HBSMMV99', 'GORL41129HM0', 'Lucía', 'González Rodríguez', 'eofdqwn@gmail.com', 'dilojmlmtg', TRUE, 45076, '850.C', 'Avenida de la Independencia', 'Colonia Centro', 2, FALSE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2626950, 'MOTA41123MASSLX75', 'MOTA41123MO2', 'Antonio', 'Moreno Torres', 'mwahsogemkhfa@gmail.com', 'fqbkrpqfqaaeb', TRUE, 87970, '367.B', 'Calle del Sol', 'Colonia San Francisco', 0, TRUE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5730483, 'ROJP11018HPLFCN62', 'ROJP11018HO7', 'Pedro', 'Rodríguez Jiménez', 'bguqtfsgp@nuclea.solutions', 'jtfqkasro', TRUE, 58018, '144.C', 'Calle Juárez', 'Colonia Las Águilas', 2, FALSE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6579790, 'HEHA201HTLAYW13', 'HEHA201HTLQ1', 'Adrián', 'Hernández Hernández', 'xqvokrwfsc@gmail.com', 'sortsxqrplab', TRUE, 22204, '961.B', 'Avenida de los Arcos', 'Colonia Valle Verde', 0, TRUE, 2, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6370101, 'TORB1113HQRCLU84', 'TORB1113HQM4', 'Beatriz', 'Torres Rodríguez', 'suhiigmyg@outlook.com', 'cglmwbneo', FALSE, 25390, '100.A', 'Calle de la Santa Cruz', 'Colonia El Cerrito', 0, FALSE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5092159, 'RUJP3713HJCTOU95', 'RUJP3713HJH6', 'Pedro', 'Ruiz Jiménez', 'qlgdyulhqccvh@gmail.com', 'gjwqspokxqir', FALSE, 69661, '621.C', 'Avenida Universidad', 'Colonia Morelos', 1, TRUE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3669420, 'GORJ0626HMSPVK30', 'GORJ0626HME0', 'Juan', 'González Ruiz', 'vqxxbgfllbejx@yahoo.com', 'vdmrbai', FALSE, 15045, '605.C', 'Calle de la Virgen', 'Colonia Santa Rosa', 0, FALSE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6411934, 'MARR204HSLMHP92', 'MARR204HSLK4', 'Roberto', 'Martínez Ruiz', 'veqmkvaj@yahoo.com', 'nxoygdfaq', FALSE, 86508, '580.C', 'Calle de la Paz', 'Colonia San José', 2, TRUE, 3, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(468166, 'RUMJ1027HPLUAF41', 'RUMJ1027HPF0', 'José', 'Ruiz Martínez', 'bpcatrvd@nuclea.solutions', 'bnwcgnvtvsv', TRUE, 78347, '876.B', 'Calle Juárez', 'Colonia El Campanario', 2, TRUE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3276349, 'HEGP357MBCTQR73', 'HEGP357MBCR1', 'Pedro', 'Hernández González', 'ikaduooegyonl@yahoo.com', 'gmdvihn', FALSE, 14439, '699.B', 'Calle Juárez', 'Colonia Los Ángeles', 2, TRUE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3479671, 'GORA0104MASFCV85', 'GORA0104MAK6', 'Adrián', 'González Rodríguez', 'vrearqkrujec@nuclea.solutions', 'qdwadrgkvcli', FALSE, 97765, '657.C', 'Calle de la Paz', 'Colonia Santa Fe', 3, FALSE, 1, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6877831, 'FEJD0917HJCGUE63', 'FEJD0917HJN6', 'David', 'Fernández Jiménez', 'clfpdgqmbbb@nuclea.solutions', 'cpgpwqipyguo', FALSE, 72017, '345.B', 'Calle de la Reforma', 'Colonia Morelos', 3, FALSE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(744132, 'FEFS2823MSLDUH46', 'FEFS2823MSV1', 'Susana', 'Fernández Fernández', 'mfhigwqpffdf@outlook.com', 'odnqymhccwxd', FALSE, 38724, '309.C', 'Avenida Constituyentes', 'Colonia Nuevo Milenio', 1, FALSE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6780723, 'RUGR31028HOCWTR27', 'RUGR31028HA9', 'Roberto', 'Ruiz González', 'tasspjyljjhbk@nuclea.solutions', 'tlbaaquy', TRUE, 77701, '170.A', 'Calle del Carmen', 'Colonia Lomas de Querétaro', 1, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5832360, 'HEMJ072MGRNMU72', 'HEMJ072MGRX8', 'Javier', 'Hernández Moreno', 'qliwcjwnb@gmail.com', 'duxvmsue', TRUE, 72672, '881.C', 'Calle Allende', 'Colonia Emiliano Zapata', 0, FALSE, 2, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6555962, 'HEGE041MNLYEC61', 'HEGE041MNLG0', 'Enrique', 'Hernández González', 'shhsbovevnkmg@nuclea.solutions', 'uqutsbytfbff', FALSE, 31217, '517.B', 'Calle Benito Juárez', 'Colonia El Mirador', 3, FALSE, 1, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1038494, 'RORP361MGTBGM69', 'RORP361MGTA2', 'Pedro', 'Rodríguez Rodríguez', 'wfdxmparxm@outlook.com', 'vpbaawx', TRUE, 98514, '59.A', 'Calle de los Cedros', 'Colonia El Cerrito', 1, TRUE, 2, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5948603, 'JIGA045HGRBCF59', 'JIGA045HGRL6', 'Adrián', 'Jiménez González', 'dbuinskft@gmail.com', 'tssqljqsurx', FALSE, 23892, '152.C', 'Avenida de la Constitución', 'Colonia Reforma', 2, TRUE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4206326, 'TORS184HSLXAN31', 'TORS184HSLK3', 'Susana', 'Torres Ruiz', 'xuyptggrkd@gmail.com', 'usffkdkx', TRUE, 50628, '140.B', 'Calle Juárez', 'Colonia San Francisco', 3, FALSE, 3, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7758519, 'JIJJ1510MGRYFS83', 'JIJJ1510MGT2', 'Javier', 'Jiménez Jiménez', 'acrufakm@outlook.com', 'haqcdfvbkwhfy', TRUE, 57605, '351.A', 'Calle de la Merced', 'Colonia El Laurel', 3, FALSE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2805277, 'GOMC2315MASHVX34', 'GOMC2315MAM3', 'Carlos', 'González Moreno', 'kygtwfo@nuclea.solutions', 'ynaxbrh', FALSE, 28628, '604.B', 'Calle Juárez', 'Colonia La Pradera', 1, FALSE, 1, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7919207, 'MARB120MNTIVH36', 'MARB120MNTH6', 'Beatriz', 'Martínez Ruiz', 'vnmumrteh@yahoo.com', 'ecgbuslivn', FALSE, 32739, '314.A', 'Calle de la Amistad', 'Colonia Santa Fe', 2, FALSE, 2, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3377840, 'JIFJ287HVZPRS24', 'JIFJ287HVZQ2', 'Juan', 'Jiménez Fernández', 'amfrjbit@outlook.com', 'xaicyqtrhqrw', TRUE, 72362, '614.B', 'Avenida de la Luz', 'Colonia Jardines de Querétaro', 2, TRUE, 1, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2912640, 'FETL31112HTLBOE16', 'FETL31112HY4', 'Laura', 'Fernández Torres', 'wrxvgvei@gmail.com', 'rpvarkhsir', TRUE, 37399, '477.A', 'Avenida Morelos', 'Colonia Jardines de Querétaro', 0, TRUE, 2, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4350420, 'MAJL1814MMSWUR48', 'MAJL1814MMT9', 'Laura', 'Martínez Jiménez', 'frhrlcwgul@nuclea.solutions', 'dnmkowmjxlfp', TRUE, 81923, '75.A', 'Calle de los Pinos', 'Colonia Santa Fe', 2, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7724883, 'ROMR3820HYNVIW57', 'ROMR3820HYB0', 'Rafael', 'Rodríguez Moreno', 'ftrpjgx@outlook.com', 'hwbtvlvh', TRUE, 61246, '207.A', 'Calle de la Amistad', 'Colonia Valle Verde', 0, TRUE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1306206, 'HEMR4727MOCMQW32', 'HEMR4727MOW3', 'Raquel', 'Hernández Moreno', 'twohtqqvewe@nuclea.solutions', 'diuxakhgvckd', FALSE, 25393, '12.B', 'Calle de la Esperanza', 'Colonia San Francisco', 3, TRUE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3207450, 'JIRC4922MSLXHA29', 'JIRC4922MSD4', 'Carlos', 'Jiménez Rodríguez', 'nuguuglrutkrc@nuclea.solutions', 'hhaiuqssoc', TRUE, 35378, '291.A', 'Calle de la Esperanza', 'Colonia El Laurel', 0, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7706382, 'TORB2321HGRVFC75', 'TORB2321HGO9', 'Beatriz', 'Torres Ruiz', 'khsbvdww@yahoo.com', 'kjlhfrgmuvlrd', TRUE, 98424, '399.C', 'Calle Corregidora', 'Colonia Valle Verde', 3, TRUE, 2, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3087121, 'GOTR0416HQRTUR29', 'GOTR0416HQT7', 'Roberto', 'González Torres', 'jwxeeetnj@nuclea.solutions', 'upajwxmldgiva', TRUE, 35945, '80.B', 'Calle de la Merced', 'Colonia Nuevo Milenio', 1, FALSE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(547728, 'MAMA1103HJCLJD11', 'MAMA1103HJI8', 'Antonio', 'Martínez Martínez', 'fnfhbpl@gmail.com', 'thffalf', TRUE, 42357, '296.C', 'Avenida de la Solidaridad', 'Colonia Los Ángeles', 2, TRUE, 3, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6792475, 'GOMR0618HSRHAR60', 'GOMR0618HSF5', 'Roberto', 'González Martínez', 'xiasnhuaffwe@outlook.com', 'nlxkiohqmoq', FALSE, 51735, '683.B', 'Calle de los Cedros', 'Colonia El Mirador', 1, FALSE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6539075, 'FEHB275HGTOBQ69', 'FEHB275HGTV1', 'Beatriz', 'Fernández Hernández', 'gnhuqxeba@yahoo.com', 'kpadqykg', FALSE, 48478, '92.B', 'Avenida de la Constitución', 'Colonia Jardines de Querétaro', 0, TRUE, 3, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6173538, 'GOTI3110HSLRYG48', 'GOTI3110HSN5', 'Isabel', 'González Torres', 'mcfgcciohf@outlook.com', 'ejckwoeafgbgb', TRUE, 18432, '689.C', 'Calle de la Merced', 'Colonia San Francisco', 3, FALSE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7046332, 'RUTA177HMSDWH47', 'RUTA177HMSK0', 'Ana', 'Ruiz Torres', 'aisdxure@nuclea.solutions', 'oxfiyxjfurlbc', FALSE, 98755, '107.C', 'Calle de la Amistad', 'Colonia La Pradera', 2, TRUE, 2, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(4951069, 'GOJL21114HNTWYE13', 'GOJL21114HF5', 'Lucía', 'González Jiménez', 'tsnuyiorfmht@nuclea.solutions', 'lrwbsre', FALSE, 85677, '313.C', 'Calle de la Corregidora', 'Colonia Santa Fe', 2, FALSE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(8184668, 'MATE1214HDGSII48', 'MATE1214HDP6', 'Enrique', 'Martínez Torres', 'yxqbtnskj@gmail.com', 'hrbnnufdn', FALSE, 38504, '548.C', 'Calle de la Santa Cruz', 'Colonia San Francisco', 1, TRUE, 3, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6686159, 'MARJ413HZSJFC11', 'MARJ413HZSU2', 'José', 'Martínez Rodríguez', 'ixakfmscyoxj@outlook.com', 'gotrrdfbw', TRUE, 92241, '396.C', 'Avenida de la Solidaridad', 'Colonia San Francisco', 2, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3909690, 'RUHR106HQTCNE13', 'RUHR106HQTT4', 'Raquel', 'Ruiz Hernández', 'puyrwox@nuclea.solutions', 'ldrprah', TRUE, 29259, '407.A', 'Avenida de la Luz', 'Colonia El Cerrito', 0, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7000958, 'ROFE1015MPLVIA87', 'ROFE1015MPQ8', 'Enrique', 'Rodríguez Fernández', 'outixxw@gmail.com', 'jsblgeclrkap', FALSE, 76384, '422.B', 'Calle de los Abetos', 'Colonia Reforma', 1, TRUE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6170775, 'TOGA4011MNTJAS44', 'TOGA4011MNP0', 'Ana', 'Torres González', 'pynlqidfm@nuclea.solutions', 'bcsamqtbawvo', FALSE, 63709, '714.A', 'Calle de la Merced', 'Colonia El Campanario', 2, FALSE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7418983, 'FEGJ1426MSLNAB28', 'FEGJ1426MSI5', 'Juan', 'Fernández González', 'sjdetbprkrayb@outlook.com', 'lotmuvpfsthgt', TRUE, 47245, '6.C', 'Avenida de la Libertad', 'Colonia Las Águilas', 1, TRUE, 2, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(886691, 'MOMJ01128HPLHVD18', 'MOMJ01128HM8', 'José', 'Moreno Moreno', 'cvwyaqtautfux@yahoo.com', 'ourxrqvlm', TRUE, 78992, '220.C', 'Avenida Madero', 'Colonia La Pradera', 0, TRUE, 2, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6579380, 'MAHJ1621MTLSEA91', 'MAHJ1621MTA0', 'Javier', 'Martínez Hernández', 'uoomstus@gmail.com', 'cofwkvjdd', FALSE, 26799, '4.C', 'Calle del Sol', 'Colonia San Francisco', 3, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6303891, 'MOJA0914MMCWDA72', 'MOJA0914MMI4', 'Alberto', 'Moreno Jiménez', 'firhrstfa@yahoo.com', 'lqanbbbqc', TRUE, 13811, '707.C', 'Avenida Constituyentes', 'Colonia Santa Rosa', 1, FALSE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2519283, 'GOMR41124HTLBFM97', 'GOMR41124HB8', 'Raquel', 'González Moreno', 'ftjopedu@gmail.com', 'lwmelykgxdqa', FALSE, 48409, '317.B', 'Calle de la Corregidora', 'Colonia Lomas de Querétaro', 3, TRUE, 2, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(5316784, 'HERB4327MTCWWS73', 'HERB4327MTJ1', 'Beatriz', 'Hernández Ruiz', 'xkytkkvpok@gmail.com', 'afcmobuoit', TRUE, 31152, '772.A', 'Avenida Universidad', 'Colonia Santa Fe', 2, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(884097, 'GOHR2321MASHHD69', 'GOHR2321MAV9', 'Raquel', 'González Hernández', 'xkbudbgyy@outlook.com', 'ksqwwmn', TRUE, 90933, '444.A', 'Calle de la Luna', 'Colonia El Cerrito', 3, FALSE, 1, 2);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(117328, 'RUGA425HVZTQO60', 'RUGA425HVZC0', 'Adrián', 'Ruiz González', 'vhomygddp@outlook.com', 'ofvbjjlky', FALSE, 29160, '644.C', 'Calle de la Corregidora', 'Colonia Emiliano Zapata', 3, TRUE, 3, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7238177, 'FERF3611MSLFEK27', 'FERF3611MSK5', 'Fernando', 'Fernández Rodríguez', 'msbwivux@outlook.com', 'cdxdoesi', FALSE, 64904, '486.B', 'Calle de la Reforma', 'Colonia Emiliano Zapata', 2, TRUE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(39812, 'JIMF3429MBCMXJ55', 'JIMF3429MBQ1', 'Fernando', 'Jiménez Martínez', 'umcheqx@nuclea.solutions', 'vsjmtofl', FALSE, 64083, '557.C', 'Calle de los Abetos', 'Colonia San José', 3, FALSE, 1, 3);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(6124458, 'HERM463HTLMXR70', 'HERM463HTLT8', 'Mercedes', 'Hernández Ruiz', 'fldubbivv@nuclea.solutions', 'fxbwtdvh', FALSE, 63920, '341.B', 'Avenida Constituyentes', 'Colonia del Sol', 1, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(7340048, 'FEMD0112HCSUAO99', 'FEMD0112HCX2', 'David', 'Fernández Moreno', 'ebykdfci@nuclea.solutions', 'ivlulxhkwygy', TRUE, 33093, '443.B', 'Calle de la Estación', 'Colonia Reforma', 0, TRUE, 2, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(8366580, 'HEGA0621HTLORY73', 'HEGA0621HTX8', 'Ana', 'Hernández González', 'uftcvkkrd@yahoo.com', 'qxxdddaewtu', FALSE, 74973, '461.B', 'Avenida Madero', 'Colonia Santa Fe', 3, FALSE, 1, 4);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(1479682, 'TOHC240HCMPJE50', 'TOHC240HCMG2', 'Carlos', 'Torres Hernández', 'tqwtkvoycfs@yahoo.com', 'sfgbnoowlddp', TRUE, 86295, '345.B', 'Calle Zaragoza', 'Colonia San José', 2, FALSE, 1, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(3135234, 'HEMF452MMSGGS53', 'HEMF452MMSX4', 'Fernando', 'Hernández Martínez', 'nxelncfuysp@yahoo.com', 'gilbomkh', FALSE, 84393, '671.A', 'Calle de la Luna', 'Colonia Las Águilas', 1, FALSE, 2, 1);
INSERT INTO user(userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES(2280434, 'MOMA0025HCLMJM53', 'MOMA0025HCI7', 'Ana', 'Moreno Martínez', 'hvfhipt@nuclea.solutions', 'uuypgys', FALSE, 16026, '940.C', 'Calle Benito Juárez', 'Colonia La Pradera', 2, FALSE, 1, 2);

INSERT INTO userDepartment(departmentIDFK, userIDFK) values (16, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (21, 3276349); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (8, 1038494); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 7340048); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (22, 5362506); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (24, 6555962); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (6, 962624); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (10, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (25, 4206326); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (23, 3276349); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (10, 3614713); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 8366580); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (5, 962624); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 6170775); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 8213764); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (14, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (4, 5362506); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 6934954); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (7, 4700400); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 871052); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 5457001); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (1, 5788471); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 4275065); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (11, 3569605); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (16, 7724883); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (5, 7391948); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (6, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 547728); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (7, 886691); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (25, 713880); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (9, 4766730); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (8, 8313776); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (24, 3614713); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (25, 5160457); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (10, 5362506); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 4772088); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (11, 6173538); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (25, 3779211); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (2, 8184668); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (24, 7418983); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 2912640); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 4486255); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (5, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 8213764); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (24, 3374197); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 6303891); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (3, 3909690); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 4275065); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (25, 7046332); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 6161968); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 4700400); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (14, 6539075); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 6792475); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (5, 2519283); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (23, 5788471); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 6877831); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (9, 117328); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 6780723); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (22, 1982145); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (4, 871052); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 2963952); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (3, 117328); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 547728); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (1, 4275065); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 2519283); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (2, 7919207); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 6780723); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (7, 5316784); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (3, 1985896); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (2, 1469403); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 2887299); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (21, 3377840); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (22, 1411276); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 884097); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (23, 4772088); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 2963952); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 39812); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 6141366); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 6539075); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 7724883); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (10, 3909690); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 4350420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (9, 4828217); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (8, 6161968); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (10, 3374197); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 3569605); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (2, 1666834); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (3, 1469403); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (4, 1479682); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 7340048); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (16, 2887299); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (21, 7346965); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 4951069); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (4, 6141366); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (9, 6555962); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 4275065); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (16, 5788471); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 6686159); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (4, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 7709944); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 7758519); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (14, 871052); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 2528964); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (16, 2952784); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 5092159); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (1, 6934954); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 8184668); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (8, 1479682); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (11, 886691); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (21, 2805277); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 8366580); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 6579380); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 7046332); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (4, 5948603); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (14, 6161968); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (10, 2952784); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (24, 6686159); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (21, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 7724883); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 8213764); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (24, 871052); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 2963952); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 2519283); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (24, 3087121); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 8184668); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (1, 1306206); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (8, 4766730); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (1, 7291902); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (2, 6792475); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (22, 5457001); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (23, 4772088); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (23, 3909690); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (6, 6370101); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 1306206); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (8, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (8, 1469403); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (7, 7169208); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (21, 6579790); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 4399563); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (6, 4275065); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (18, 7346965); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (5, 5362506); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (25, 3669420); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (2, 3909690); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (13, 7653261); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 5124017); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (6, 3569605); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 117328); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (12, 3374197); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 8184668); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (17, 7340048); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (3, 7706382); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (20, 4828217); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (3, 6411934); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (22, 2519283); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (21, 7169208); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 6141366); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (15, 963206); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (9, 3377840); 
INSERT INTO userDepartment(departmentIDFK, userIDFK) values (19, 884097); 

INSERT INTO templateHoliday(holidayDate, title) VALUES('1806-03-21', 'Independencia');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-03-08', 'Independencia');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-10-01', 'Día del Amor y la Amistad');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-10-01', 'Semana Santa');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-06-02', 'Día del Niño');
INSERT INTO templateHoliday(holidayDate, title) VALUES('1920-09-15', 'Día del Niño');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-08-22', 'Día de la Virgen de Guadalupe');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-02-19', 'Día del Estudiante');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-10-12', 'Día del Amor y la Amistad');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-10-01', 'Navidad');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-09-21', 'Día del Padre');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-05-23', 'Día de San Valentín');
INSERT INTO templateHoliday(holidayDate, title) VALUES('1920-09-15', 'Día de la Bandera');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-01-02', 'Día de Muertos');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2000-01-07', 'Día Internacional de la Paz');
INSERT INTO templateHoliday(holidayDate, title) VALUES('1920-09-15', 'Día del Padre');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-03-08', 'Semana Santa');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-06-16', 'Día del Padre');
INSERT INTO templateHoliday(holidayDate, title) VALUES('1917-02-05', 'Día del Arquitecto');
INSERT INTO templateHoliday(holidayDate, title) VALUES('2026-01-02', 'Día de San Valentín');

INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1910-11-20', 14); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1886-05-01', 3); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1886-05-01', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-08-28', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1806-03-21', 10); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-03-08', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-06-16', 1); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-10-01', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-10-01', 8); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-06-05', 19); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-11-02', 3); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-04-02', 16); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-12-25', 4); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1917-02-05', 16); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1886-05-01', 5); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-02-19', 2); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-08-28', 1); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1910-11-20', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1934-02-24', 7); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-08-22', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-10-01', 16); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-08-28', 20); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-02-14', 12); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1920-09-15', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-02-14', 8); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-04-30', 20); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-02-19', 8); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-05-23', 8); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-04-07', 4); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-09-21', 16); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-08-22', 11); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-04-02', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1920-09-15', 4); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-05-23', 20); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-02-14', 1); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-04-07', 11); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-06-02', 4); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-10-01', 3); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1917-02-05', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1917-02-05', 6); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-05-10', 1); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-09-21', 14); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('1910-11-20', 16); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-04-02', 11); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-06-02', 1); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-10-12', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-08-28', 18); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-01-02', 13); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-08-28', 2); 
INSERT INTO usedHoliday(usedDate, usedTemplateHolidayID) VALUES('2026-10-01', 15); 

INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-06-05', '2026-05-15',1666834); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-01-02', '1531-12-12',2528964); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1917-02-05', '2026-08-28',5316784); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-01-02', '2000-01-07',1985896); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-11-02', '2026-06-16',744132); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1531-12-12', '1934-02-24',4700400); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1934-02-24', '1920-09-15',6161968); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-09-21', '2026-05-10',1479682); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-01-02', '2026-02-14',4486255); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-05-23', '2026-03-08',6579380); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1886-05-01', '2026-09-21',5092159); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1917-02-05', '1934-02-24',7046332); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2000-01-07', '1917-02-05',1306206); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1886-05-01', '1934-02-24',7346965); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-05-15', '2026-06-02',7856016); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1934-02-24', '2000-01-07',39812); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-12-25', '2026-08-28',884097); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-02-14', '1910-11-20',3479671); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-08-22', '1531-12-12',3614713); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-08-28', '2026-08-28',6686159); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-08-28', '2026-09-21',8184668); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-06-16', '2026-04-30',6124458); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1531-12-12', '2026-04-02',7758519); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-05-10', '2026-01-02',963206); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1806-03-21', '2026-06-05',7346965); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-06-05', '1934-02-24',1306206); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-02-14', '1531-12-12',2280434); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-06-05', '1934-02-24',7653261); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1886-05-01', '2026-04-02',2528964); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-04-02', '2026-08-28',6370101); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-05-23', '2026-02-19',6579790); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1886-05-01', '2026-02-14',3377840); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-06-02', '2026-02-19',4350420); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-06-02', '2026-12-25',2626950); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2000-01-07', '1910-11-20',4486255); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-06-02', '2026-04-02',6877831); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1934-02-24', '2026-06-05',5160457); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1917-02-05', '2026-02-14',4766730); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-04-07', '2026-04-07',3377840); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1934-02-24', '2026-10-12',5362506); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-08-22', '2026-06-02',7758519); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-01-02', '1934-02-24',4486255); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-10-01', '1806-03-21',3779211); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-11-02', '2026-02-19',5316784); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-08-22', '2026-02-19',6877831); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2000-01-07', '2026-02-14',1306206); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-08-22', '2000-01-07',8184668); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1910-11-20', '1886-05-01',547728); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-05-10', '2026-05-15',6555962); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2000-01-07', '1917-02-05',2952784); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-12-25', '1934-02-24',4620447); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-10-12', '2026-03-08',117328); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-12-25', '2026-05-23',8184668); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1934-02-24', '2026-08-28',3377840); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-08-22', '2026-10-12',6173538); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1910-11-20', '2026-03-08',2952784); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('1917-02-05', '2026-10-01',8356463); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-04-07', '2026-01-02',8366580); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-11-02', '2026-04-02',6934954); 
INSERT INTO workStatus(startDate,endDate, userStatusIDFK) VALUES('2026-09-21', '2026-03-08',5788471); 

INSERT INTO oneOnOneQuestion(question) VALUES('¿A quién quiero reconocer en la semana?'); 
INSERT INTO oneOnOneQuestion(question) VALUES('¿Qué vamos hacer para cumplir las metas?'); 
INSERT INTO oneOnOneQuestion(question) VALUES('¿Tuviste alguna situación complicada en tu semana que afectara en tu trabajo?'); 
INSERT INTO oneOnOneQuestion(question) VALUES('¿Qué vamos hacer para cumplir las metas?'); 

INSERT INTO oneOnOneMeasurable(summary) VALUES('Salud fisica: El colaborador menciona tener una salud fisica buena'); 
INSERT INTO oneOnOneMeasurable(summary) VALUES('Carga de trabajo: El colaborador siente que su carga es medianamente manejable'); 
INSERT INTO oneOnOneMeasurable(summary) VALUES('Carga de trabajo El colaborador siente que su carga de trabajo no es manejable'); 
INSERT INTO oneOnOneMeasurable(summary) VALUES('Salud emocional: El colaborador se siente regular emocionalmente y con emociones poco positivas'); 
INSERT INTO oneOnOneMeasurable(summary) VALUES('Reconocimiento: El colaborador se siente poco valorado por sus compañeros'); 

INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:00:00', 1038494);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:15:00', 5730483);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:45:00', 6555962);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:30:00', 2280434);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:30:00', 6539075);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:15:00', 2805277);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:30:00', 6792475);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:15:00', 6579790);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:45:00', 1982145);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:15:00', 6141366);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:30:00', 4486255);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:15:00', 7169208);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:45:00', 3087121);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:00:00', 4399563);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:30:00', 1982145);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:45:00', 6370101);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:15:00', 4486255);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:45:00', 6173538);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:45:00', 2887299);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:00:00', 4399563);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:15:00', 3087121);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:00:00', 7919207);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:15:00', 7653261);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:30:00', 6686159);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:30:00', 3909690);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:30:00', 7856016);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:15:00', 7000958);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:15:00', 4700400);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:30:00', 5457001);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:45:00', 962624);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:15:00', 2626950);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:45:00', 6124458);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:45:00', 7291902);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:45:00', 117328);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:15:00', 5092159);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:30:00', 3779211);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:45:00', 4766730);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:30:00', 871052);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:00:00', 6780723);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:30:00', 884097);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:00:00', 2280434);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:15:00', 4620447);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:45:00', 4700400);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:30:00', 7340048);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:15:00', 1306206);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:15:00', 5788471);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:15:00', 7340048);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:15:00', 2887299);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:30:00', 2952784);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:00:00', 2626950);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:15:00', 1985896);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:45:00', 3909690);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:45:00', 871052);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:00:00', 4620447);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 14:15:00', 3087121);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:00:00', 7856016);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:15:00', 3909690);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:00:00', 7919207);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:15:00', 6579380);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:30:00', 6170775);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:00:00', 2626950);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-21 16:15:00', 2963952);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:45:00', 2887299);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:45:00', 713880);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-05 09:45:00', 4486255);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:15:00', 2963952);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-07 07:00:00', 2963952);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-03-20 13:45:00', 6792475);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:45:00', 2963952);
INSERT INTO oneOnOne(expectedTime, meetingDate, oneOnOneUserIDFK) VALUES(15, '2025-05-12 14:30:00', 2805277);

INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 2, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 51, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 5, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 48, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 54, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 34, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 5, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 41, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 42, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 26, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 40, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 34, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 12, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 59, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 61, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 68, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 34, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 57, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 30, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 22, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 39, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 52, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 47, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 21, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 38, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 24, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 36, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 53, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 2, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 65, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 23, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 53, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 53, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 41, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 51, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 21, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 54, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 14, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 11, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 28, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 9, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 17, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 4, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 62, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 63, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 68, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 4, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 45, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 2, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 21, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 65, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 21, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 46, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 9, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 36, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 37, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 11, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 5, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 26, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 62, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 61, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 46, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 69, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 53, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 28, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 54, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 25, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 4, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 6, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 63, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 52, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 5, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 67, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 42, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 3, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 2, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 47, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 2, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 63, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 33, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 60, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 68, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 45, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 68, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 55, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 16, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 70, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 41, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 51, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 7, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 42, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 29, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 2, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 53, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 24, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 1, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 49, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 64, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 50, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 11, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 22, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 64, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 15, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 9, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 19, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 58, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 69, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 17, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 55, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 34, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 44, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 29, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 56, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 17, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 16, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 24, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 68, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 8, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 24, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 38, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 69, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 29, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 4, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 8, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 35, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 49, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 52, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 22, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 35, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 69, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 6, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 20, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 34, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 16, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 21, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 20, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 70, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En su mayoría la semana fue fluida, aunque surgió una situación que requirió reordenar prioridades, lo cual se solucionó rápidamente.', 55, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 48, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 57, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 46, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 46, 1);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 52, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 24, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Estoy satisfecho por haber superado varios desafíos y mejorar mi organización y gestión del tiempo.', 16, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 31, 3);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 45, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 44, 2);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 47, 4);
INSERT INTO oneOnOneAnswer(answer, answerOneOnOneIDFK, questionIDFK) VALUES('Por el momento, estamos cumpliendo los plazos establecidos y el progreso es consistente.', 9, 4);

INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 60, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 46, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 20, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 43, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 53, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 37, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 32, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 31, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 69, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 14, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 54, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 17, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 41, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 7, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 2, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 56, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 62, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 30, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 60, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 26, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 42, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 14, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 10, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 25, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 69, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 30, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 32, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 25, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 64, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 67, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 55, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 5, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 55, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 16, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 70, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 1, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 55, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 65, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 50, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 19, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 10, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 52, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 57, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 53, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 58, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 4, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 28, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 63, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 68, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 45, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 18, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 30, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 24, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 44, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 22, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 36, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 59, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 38, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 23, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 63, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 28, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 66, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 17, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 42, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 3, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 65, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 30, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 11, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 25, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 53, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 41, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 70, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 3, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 38, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 39, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 41, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 13, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 53, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 24, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 53, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 68, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 3, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 53, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 19, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 13, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 12, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 38, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 21, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 24, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 43, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 14, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 70, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 43, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 30, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 28, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 26, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 43, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 38, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 22, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 55, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 25, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 67, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 51, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 50, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 43, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 10, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 51, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 3, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 58, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 31, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 55, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 45, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 53, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 24, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 70, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 65, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 30, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 62, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 6, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 1, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 45, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 68, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 24, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 25, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 42, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 9, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 69, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 17, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 67, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 18, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 20, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 14, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 20, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 19, 2);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 2, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(1, 68, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 41, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 29, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 58, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 33, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 67, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(2, 16, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 51, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 40, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 50, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 60, 4);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 40, 1);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(4, 30, 5);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(3, 47, 3);
INSERT INTO oneOnOneMeasure(evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES(5, 12, 3);

INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 7418983);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 7391948);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'Incumplir con los plazos establecidos para la entrega de proyectos o tareas', 2952784);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 1038494);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Incumplir con los plazos establecidos para la entrega de proyectos o tareas', 3276349);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 5788471);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 871052);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 8366580);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'No seguir las políticas o procedimientos establecidos por la empresa', 3909690);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 2805277);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 3207450);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 744132);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 4620447);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'No seguir las políticas o procedimientos establecidos por la empresa', 886691);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'No seguir las políticas o procedimientos establecidos por la empresa', 7169208);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Incumplir con los plazos establecidos para la entrega de proyectos o tareas', 6161968);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-12', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 5124017);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'Incumplir con los plazos establecidos para la entrega de proyectos o tareas', 6792475);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'No seguir las políticas o procedimientos establecidos por la empresa', 1469403);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 8366580);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 6555962);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 1306206);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 962624);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Incumplir con los plazos establecidos para la entrega de proyectos o tareas', 6141366);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 6411934);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 7169208);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 39812);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 7709944);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-12', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 6173538);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 2519283);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-12', 'No seguir las políticas o procedimientos establecidos por la empresa', 8184668);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 7418983);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 7291902);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 7919207);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 8300847);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-12', 'No seguir las políticas o procedimientos establecidos por la empresa', 2887299);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-12', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 6303891);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 8356463);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 6141366);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 7418983);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 6303891);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 884097);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-12', 'Incumplir con los plazos establecidos para la entrega de proyectos o tareas', 6411934);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 3276349);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 7418983);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 3479671);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-16', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 6686159);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-05-14', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas', 3779211);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-17', 'Cometer fallos en el trabajo de forma repetitiva, a pesar de haber sido señalados previamente', 3276349);
INSERT INTO fault(doneDate, summary, faultUserIDFK) VALUES('2025-03-30', 'Incumplir con los plazos establecidos para la entrega de proyectos o tareas', 5948603);

INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/06/09', '33/06/10', 'Probar nuevas comidas', 0, 2, 7709944);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('29/06/29', '29/06/30', 'Tomar fotos y crear recuerdos', 1, 1, 2952784);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/11/24', '33/11/25', 'Disfrutar de la naturaleza', 2, 1, 7706382);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/03/15', '27/03/16', 'Explorar diferentes culturas', 0, 2, 713880);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/11/06', '27/11/07', 'Disfrutar de la naturaleza', 0, 2, 5124017);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('30/04/27', '30/04/28', 'Mejorar la salud mental', 2, 1, 1038494);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('25/08/22', '25/08/23', 'Descansar del trabajo', 0, 1, 4206326);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('30/05/29', '30/05/30', 'Explorar diferentes culturas', 1, 1, 7706382);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('26/03/12', '26/03/13', 'Visitar amigos o familiares', 2, 1, 962624);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('32/06/06', '32/06/07', 'Explorar diferentes culturas', 2, 1, 5160457);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('25/06/17', '25/06/18', 'Tomar fotos y crear recuerdos', 1, 0, 2280434);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('25/08/22', '25/08/23', 'Cumplir un sueño personal', 0, 0, 1666834);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/04/03', '33/04/04', 'Aprender un nuevo idioma', 2, 2, 5948603);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/05/06', '33/05/07', 'Descansar del trabajo', 0, 1, 7653261);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('26/06/21', '26/06/22', 'Descansar del trabajo', 1, 0, 7291902);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/01/21', '31/01/22', 'Fortalecer la relación de pareja', 1, 2, 6141366);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('32/03/29', '32/03/30', 'Recargar energía y motivación', 2, 2, 8184668);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/04/03', '33/04/04', 'Practicar deportes extremos', 0, 0, 6539075);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/07/12', '33/07/13', 'Realizar actividades al aire libre', 1, 1, 5160457);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/05/21', '27/05/22', 'Aprender un nuevo idioma', 0, 0, 4275065);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/04/29', '31/04/30', 'Tomar fotos y crear recuerdos', 1, 0, 468166);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/12/29', '33/12/30', 'Practicar deportes extremos', 1, 1, 886691);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/06/24', '27/06/25', 'Aprender un nuevo idioma', 1, 2, 8366580);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('30/09/09', '30/09/10', 'Mejorar la salud mental', 0, 2, 1985896);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('26/01/07', '26/01/08', 'Mejorar la salud mental', 2, 1, 7709944);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/01/27', '33/01/28', 'Aprovechar promociones de viaje', 0, 0, 3614713);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/11/24', '33/11/25', 'Fortalecer la relación de pareja', 0, 2, 3276349);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/01/21', '31/01/22', 'Aprender un nuevo idioma', 0, 2, 1666834);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('28/01/12', '28/01/13', 'Festejar un cumpleaños', 2, 0, 8366580);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('26/08/26', '26/08/27', 'Descansar del trabajo', 1, 0, 2805277);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/03/27', '31/03/28', 'Aprender un nuevo idioma', 1, 0, 6124458);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('25/10/27', '25/10/28', 'Aprovechar promociones de viaje', 0, 0, 6173538);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('26/07/23', '26/07/24', 'Conocer nuevos lugares', 1, 1, 713880);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('25/08/22', '25/08/23', 'Conocer nuevos lugares', 0, 0, 2952784);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/12/09', '27/12/10', 'Realizar actividades al aire libre', 0, 2, 6934954);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('32/05/03', '32/05/04', 'Aprender un nuevo idioma', 2, 2, 7169208);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/12/21', '31/12/22', 'Celebrar un aniversario', 2, 2, 7856016);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('32/06/06', '32/06/07', 'Probar nuevas comidas', 0, 1, 5124017);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/01/21', '31/01/22', 'Pasar tiempo con la familia', 0, 1, 8184668);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/06/03', '31/06/04', 'Tomar fotos y crear recuerdos', 1, 0, 3087121);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('26/11/03', '26/11/04', 'Reducir el estrés', 1, 1, 4399563);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/05/21', '27/05/22', 'Conocer nuevos lugares', 2, 0, 4951069);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('28/04/21', '28/04/22', 'Visitar amigos o familiares', 2, 1, 3087121);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/01/09', '27/01/10', 'Disfrutar de la naturaleza', 0, 2, 886691);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('26/04/15', '26/04/16', 'Reducir el estrés', 0, 0, 5832360);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/04/18', '27/04/19', 'Fortalecer la relación de pareja', 1, 1, 2912640);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/12/29', '33/12/30', 'Explorar diferentes culturas', 1, 1, 468166);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('30/12/18', '30/12/19', 'Practicar deportes extremos', 2, 2, 3614713);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('31/06/03', '31/06/04', 'Disfrutar de la naturaleza', 1, 1, 7291902);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('25/09/25', '25/09/26', 'Realizar actividades al aire libre', 2, 1, 1985896);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/06/09', '33/06/10', 'Desconectarse de la rutina', 1, 0, 6934954);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/07/12', '33/07/13', 'Celebrar un aniversario', 1, 2, 2626950);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('29/11/12', '29/11/13', 'Fortalecer la relación de pareja', 1, 2, 117328);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/01/09', '27/01/10', 'Festejar un cumpleaños', 0, 0, 7346965);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('30/05/29', '30/05/30', 'Realizar actividades al aire libre', 2, 0, 468166);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('33/07/12', '33/07/13', 'Aprender un nuevo idioma', 2, 0, 2963952);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('29/10/09', '29/10/10', 'Conocer nuevos lugares', 0, 1, 39812);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('29/11/12', '29/11/13', 'Visitar amigos o familiares', 2, 1, 744132);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('27/07/12', '27/07/13', 'Descansar del trabajo', 1, 1, 7706382);
INSERT INTO vacation(startDate, endDate, reason, leaderStatus, hrStatus, vacationUserIDFK) VALUES('29/12/15', '29/12/16', 'Tomar fotos y crear recuerdos', 1, 0, 5316784);

INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '25/05/14', '25/05/15', 0, 6303891); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Maternidad/Paternidad', '25/12/04', '25/12/05', 1, 4951069); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Consulta médica', '31/12/21', '31/12/22', 1, 2912640); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas de movilidad o avería del vehículo', '30/09/09', '30/09/10', 1, 1038494); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas de salud mental', '33/06/09', '33/06/10', 1, 2912640); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Licencia por matrimonio', '31/09/12', '31/09/13', 1, 5124017); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '26/09/29', '26/09/30', 0, 468166); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Vacaciones programadas', '32/07/09', '32/07/10', 0, 1666834); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Licencia por matrimonio', '25/08/22', '25/08/23', 1, 7418983); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Citación judicial', '29/01/15', '29/01/16', 1, 8300847); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Vacaciones programadas', '30/11/15', '30/11/16', 0, 4766730); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas familiares', '27/10/03', '27/10/04', 1, 7856016); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Enfermedad', '27/07/27', '27/07/28', 1, 4828217); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Trámites administrativos o legales', '30/05/29', '30/05/30', 1, 2519283); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Capacitación o curso obligatorio', '33/05/06', '33/05/07', 1, 6124458); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '25/12/04', '25/12/05', 1, 6141366); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Donación de sangre', '29/09/06', '29/09/07', 1, 3569605); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Maternidad/Paternidad', '26/05/09', '26/05/10', 0, 1982145); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas de movilidad o avería del vehículo', '33/07/12', '33/07/13', 0, 7418983); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas de movilidad o avería del vehículo', '30/05/29', '30/05/30', 1, 6579790); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Vacaciones programadas', '27/05/21', '27/05/22', 1, 1479682); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Viaje de emergencia', '26/08/26', '26/08/27', 1, 2528964); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '28/10/06', '28/10/07', 1, 1666834); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Donación de sangre', '29/12/15', '29/12/16', 0, 6303891); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Accidente', '25/08/22', '25/08/23', 1, 3779211); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Trámites administrativos o legales', '27/11/06', '27/11/07', 1, 7346965); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Huelga de transporte', '25/05/14', '25/05/15', 1, 5457001); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Luto por fallecimiento de un familiar', '26/05/09', '26/05/10', 1, 3909690); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Donación de sangre', '30/11/15', '30/11/16', 1, 2528964); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Enfermedad', '26/11/03', '26/11/04', 1, 6877831); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Citación judicial', '33/11/24', '33/11/25', 1, 8184668); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Viaje de emergencia', '25/01/03', '25/01/04', 1, 6877831); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Viaje de emergencia', '28/01/12', '28/01/13', 1, 5362506); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Licencia por matrimonio', '31/12/21', '31/12/22', 1, 5730483); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas familiares', '33/05/06', '33/05/07', 1, 8313776); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Condiciones climáticas extremas', '31/03/27', '31/03/28', 0, 2280434); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas de salud mental', '32/07/09', '32/07/10', 0, 4350420); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Viaje de emergencia', '30/01/18', '30/01/19', 0, 3377840); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Viaje de emergencia', '31/01/21', '31/01/22', 1, 468166); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Trámites administrativos o legales', '27/01/09', '27/01/10', 1, 5160457); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Accidente', '31/03/27', '31/03/28', 0, 713880); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Licencia por matrimonio', '30/12/18', '30/12/19', 1, 7653261); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Vacaciones programadas', '28/12/12', '28/12/13', 1, 713880); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '27/12/09', '27/12/10', 1, 6934954); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Vacaciones programadas', '33/01/27', '33/01/28', 0, 4350420); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Luto por fallecimiento de un familiar', '25/06/17', '25/06/18', 1, 8184668); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Accidente', '32/10/18', '32/10/19', 1, 4766730); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Licencia por matrimonio', '32/11/21', '32/11/22', 0, 8184668); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas familiares', '26/07/23', '26/07/24', 1, 2963952); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Donación de sangre', '31/03/27', '31/03/28', 0, 7169208); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Citación judicial', '25/05/14', '25/05/15', 0, 7046332); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '29/06/29', '29/06/30', 1, 7724883); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Donación de sangre', '26/09/29', '26/09/30', 1, 6792475); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Citación judicial', '30/10/21', '30/10/22', 0, 7046332); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Capacitación o curso obligatorio', '26/03/12', '26/03/13', 1, 6780723); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Luto por fallecimiento de un familiar', '33/06/09', '33/06/10', 1, 3377840); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Licencia por matrimonio', '27/11/06', '27/11/07', 0, 7000958); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Convocatoria a servicio militar o cívico', '27/10/03', '27/10/04', 0, 3374197); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '33/11/24', '33/11/25', 1, 6370101); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas de salud mental', '25/05/14', '25/05/15', 1, 3669420); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Enfermedad', '30/08/06', '30/08/07', 1, 39812); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Emergencia en el hogar (fugas, incendios, etc.)', '31/08/09', '31/08/10', 1, 963206); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '28/01/12', '28/01/13', 1, 4486255); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Problemas de salud mental', '32/01/24', '32/01/25', 0, 7046332); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Donación de sangre', '32/08/12', '32/08/13', 1, 4766730); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Emergencia en el hogar (fugas, incendios, etc.)', '28/10/06', '28/10/07', 1, 3207450); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Citación judicial', '26/09/29', '26/09/30', 0, 7709944); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Condiciones climáticas extremas', '25/01/03', '25/01/04', 1, 4772088); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Accidente', '28/04/21', '28/04/22', 0, 6303891); 
INSERT INTO absence(reason, startDate, endDate, justified, absenceUserIDFK) values('Cuidado de un hijo o familiar enfermo', '33/08/15', '33/08/16', 1, 6686159); 

INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.empresainnovadora.com/noticias/lanzamientos', 56); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.mundodigital.com/tutoriales/marketing-digital', 50); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.mundodigital.com/tutoriales/marketing-digital', 2); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.serviciosxyz.com/soluciones/internet-empresas', 61); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.micompany.com/servicios/consultoria-web', 38); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.creacionsistemas.com/planificación/pymes', 55); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.tutorialesweb.com/aprendizaje/codificacion', 51); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.creacionsistemas.com/planificación/pymes', 64); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.sistemasmodernos.com/tecnologia/innovacion', 57); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.expertositio.com/blog/diseño-web', 7); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.micompany.com/servicios/consultoria-web', 40); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.expertositio.com/blog/diseño-web', 44); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.nuevosproyectos.com/planificacion/estrategica', 40); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.interactivewebs.com/proyectos/desarrollo-software', 6); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.empresainnovadora.com/noticias/lanzamientos', 9); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.expertositio.com/blog/diseño-web', 60); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.mundodigital.com/tutoriales/marketing-digital', 17); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.sistemasmodernos.com/tecnologia/innovacion', 7); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.nuevosproyectos.com/planificacion/estrategica', 48); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.creacionsistemas.com/planificación/pymes', 25); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.tutorialesweb.com/aprendizaje/codificacion', 30); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.empresafuturo.com/servicios/desarrollo-tecnologico', 24); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.redescomunicacion.com/tutoriales/redes-sociales', 11); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.redescomunicacion.com/tutoriales/redes-sociales', 18); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.smartsolutions.com/servicios/paginas-web', 29); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.sistemasmodernos.com/tecnologia/innovacion', 34); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.nuevosproyectos.com/planificacion/estrategica', 16); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.creacionsistemas.com/planificación/pymes', 65); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.ecommerceplus.com/guias/venta-online', 35); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.smartsolutions.com/servicios/paginas-web', 65); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.soluciones360.com/soporte/atencion-cliente', 14); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.ecommerceplus.com/guias/venta-online', 61); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.nuevosproyectos.com/planificacion/estrategica', 35); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.soluciones360.com/soporte/atencion-cliente', 59); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.empresainnovadora.com/noticias/lanzamientos', 5); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.soluciones360.com/soporte/atencion-cliente', 62); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.serviciosxyz.com/soluciones/internet-empresas', 33); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.expertositio.com/blog/diseño-web', 56); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.tuempresa.com/contacto/soporte', 56); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.tiendavirtual.com/blog/estrategias-marketing', 64); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.empresafuturo.com/servicios/desarrollo-tecnologico', 39); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.nuevosproyectos.com/planificacion/estrategica', 23); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.nuevosproyectos.com/planificacion/estrategica', 58); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.empresainnovadora.com/noticias/lanzamientos', 63); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.nuevosproyectos.com/planificacion/estrategica', 28); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.tuempresa.com/contacto/soporte', 19); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.redescomunicacion.com/tutoriales/redes-sociales', 53); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.mundodigital.com/tutoriales/marketing-digital', 12); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.micompany.com/servicios/consultoria-web', 17); 
INSERT INTO absenceMedia(mediaLink, absenceIDFK) values('https://www.empresainnovadora.com/noticias/lanzamientos', 52); 

-- query para conocer los usuarios que sean de un role específico
SELECT user.birthName, user.surname
FROM user, role
WHERE user.userRoleIDFK = role.roleID AND role.title = "Colaborator";

-- query para conocer los usuarios que les toco responder una pregunta en especifico.
SELECT u.birthName, u.surname 
FROM user AS u, oneOnOne AS one, oneOnOneAnswer AS oneA, oneOnOneQuestion AS oneQ
WHERE oneQ.questionID = oneA.questionIDFK
AND oneA.answerOneOnOneIDFK = one.oneOnOneID
AND one.oneOnOneID = u.userID
AND oneQ.questionID = 6;

-- query para conocer los usuarios que les toco asistir en un día especifico a un one on one
SELECT u.birthName, u.surname, one.meetingDate
FROM user AS u, oneOnOne AS one
WHERE one.oneOnOneUserIDFK = u.userID
AND one.meetingDate BETWEEN '2025-03-20 00:00:00' AND '2025-03-20 23:59:59';

-- query para mostrar los colaboradores de un departamento
SELECT u.birthName, u.surname
FROM user u, userDepartment ud, role r
WHERE ud.departmentIDFK = 4 
AND u.userRoleIDFK = r.roleID
AND r.title = "Colaborator";

-- query para que colaborador vea los departamentos donde está registrado
SELECT d.title
FROM userDepartment ud, department d
WHERE ud.departmentIDFK = d.departmentID
AND ud.userIDFK = 5;

-- query para que colaborador vea su departamento prioritario
SELECT d.title 
FROM user u, department d
WHERE u.prioritaryDepartmentFK = d.departmentID
AND u.userID = 10;

-- query para consultar vacaciones pendientes por aprobar por el líder y aprobadas por HR
SELECT U.birthName, V.leaderStatus, V.hrStatus, D.title
FROM user U, vacation V, department D,userDepartment Ud
WHERE V.leaderStatus = 2 
AND V.hrStatus = 1 
AND U.userID = V.vacationUserIDFK 
AND U.userID = Ud.userIDFK 
AND D.departmentID = Ud.departmentIDFK;

-- query para consultar ausencias ya justificadas en el departamento de TI
SELECT U.birthName, A.justified, A.reason
FROM user U, absence A, department D, userDepartment Ud
WHERE U.userID = A.absenceUserIDFK
AND Ud.departmentIDFK = D.departmentID
AND D.title = 'TI'
AND A.justified = 1;

-- 0 Denied
-- 1 Approbed
-- 2 Waiting

-- query para mostrar el id del colaborador cuando entro y cuando salio
SELECT u.userID, u.birthName, w.startDate , w.endDate 
FROM workStatus w, user u
WHERE w.userStatusIDFK = u.userID;

--query para mostrar las fechas del día festivo y el nombre del día festivo
SELECT usedDate, title 
FROM usedHoliday u, templateHoliday t
WHERE u.usedTemplateHolidayID = t.templateHolidayID;