CREATE DATABASE workcells;

USE workcells;


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

DELIMITER $$
CREATE PROCEDURE CreateDepartment(IN departmentID VARCHAR(40), IN title VARCHAR(60), IN leaderIDFK VARCHAR(40), IN enterpriseIDFK VARCHAR(40), IN collaboratorsArray TEXT)
BEGIN
    -- Variables auxiliares
    DECLARE remaining TEXT;
    DECLARE colabId VARCHAR(40);
    SET remaining = collaboratorsArray;

    -- Inserta el departamento
    INSERT INTO department VALUES (departmentID, title, 1, enterpriseIDFK, leaderIDFK);

    -- Le añade al líder su nuevo departamento
    UPDATE user SET prioritaryDepartmentIDFK = departmentID WHERE userID = leaderIDFK;

    -- Ciclo que va modificando el priorityDepartment
    WHILE remaining IS NOT NULL AND remaining <> '' DO
        -- Extrae el primer elemento antes de '|'
        SET colabId = TRIM(SUBSTRING_INDEX(remaining, '|', 1));

        -- Actualiza el usuario correspondiente
        UPDATE user SET prioritaryDepartmentIDFK = departmentID WHERE userID = colabId;

        -- Quita el fragmento ya procesado (incluyendo el '|')
        IF LOCATE('|', remaining) > 0 THEN
            SET remaining = SUBSTRING(remaining, LOCATE('|', remaining) + 1);
        ELSE
            SET remaining = '';
        END IF;
    END WHILE;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateDepartment(IN departmentID VARCHAR(40), IN title VARCHAR(60), IN leaderIDFK VARCHAR(40), IN enterpriseIDFK VARCHAR(40), IN collaboratorsArray TEXT, IN flag TINYINT)
BEGIN
    -- Variables auxiliares
    DECLARE remaining TEXT;
    DECLARE colabId VARCHAR(40);
    SET remaining = collaboratorsArray;

    -- Elimina los usuarios del departamento a actualizar
    UPDATE user SET prioritaryDepartmentIDFK = NULL WHERE prioritaryDepartmentIDFK = departmentID;

    -- Modifica el departamento
    UPDATE department SET department.title = title, department.enterpriseIDFK = enterpriseIDFK, department.departmentLeaderIDFK = leaderIDFK, department.flag = flag WHERE department.departmentID = departmentID;

    -- Le añade al líder el departamento
    UPDATE user SET prioritaryDepartmentIDFK = departmentID WHERE userID = leaderIDFK;

    -- Ciclo que va modificando el priorityDepartment
    WHILE remaining IS NOT NULL AND remaining <> '' DO
        -- Extrae el primer elemento antes de '|'
        SET colabId = TRIM(SUBSTRING_INDEX(remaining, '|', 1));

        -- Actualiza el usuario correspondiente
        UPDATE user SET prioritaryDepartmentIDFK = departmentID WHERE userID = colabId;

        -- Quita el fragmento ya procesado (incluyendo el '|')
        IF LOCATE('|', remaining) > 0 THEN
            SET remaining = SUBSTRING(remaining, LOCATE('|', remaining) + 1);
        ELSE
            SET remaining = '';
        END IF;
    END WHILE;
END $$
DELIMITER ;

INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('7b7b8f4d-95e7-47b5-8e27-2153ced83bbd', 'New Year', '2025-01-01'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('a35ed5a5-071f-44ae-a1ef-c47e0fca4115', 'Constitution Day', '2025-02-05'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('63c9975d-eb4f-4802-b683-0e835304828a', 'Benito Juárez Birthday', '2025-03-21'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('5cd87c79-34a5-4c45-8c23-49872cd118d0', 'Labor Day', '2025-05-01'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('70e76f3d-108c-4a4c-a54a-fdee69bf5bde', 'Independence Day', '2025-09-16'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('bf959730-f3b4-4a2d-82b5-f45e1d9ae6e7', 'Revolution Day', '2025-10-20'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('aabd5f17-8c07-453c-a462-36bc97719061', 'Christmas', '2025-12-25'); 

INSERT INTO privilege(privilegeID, title, summary) values('f767ac50-7874-4894-9819-9debe3008d6b', 'Colaborador consulta ausencias', 'Colaborador consulta ausencias'); 
INSERT INTO privilege(privilegeID, title, summary) values('aefcbfa4-d93f-4d75-92cd-5b25da30b9ae', 'Colaborador consulta calendario', 'Colaborador consulta calendario'); 
INSERT INTO privilege(privilegeID, title, summary) values('8c6d4b5c-9b38-4797-9b64-7ffd839d3fb5', 'Colaborador consulta días feriados', 'Colaborador consulta días feriados'); 
INSERT INTO privilege(privilegeID, title, summary) values('b15979ff-2e0c-4f0f-b49b-d11bed14b8b3', 'Colaborador consulta falta administrativa', 'Colaborador consulta falta administrativa'); 
INSERT INTO privilege(privilegeID, title, summary) values('7e9cb251-44a9-4f31-9d71-5b626ba2fd1e', 'Colaborador consulta perfil', 'Colaborador consulta perfil'); 
INSERT INTO privilege(privilegeID, title, summary) values('94539e57-ce3a-4f92-9920-65f88c9326aa', 'Colaborador consulta sesión del One-On-One', 'Colaborador consulta sesión del One-On-One'); 
INSERT INTO privilege(privilegeID, title, summary) values('d5db2856-fc2f-4708-a728-784223758d4e', 'Colaborador consulta solicitudes de vacaciones', 'Colaborador consulta solicitudes de vacaciones'); 
INSERT INTO privilege(privilegeID, title, summary) values('61d178d3-3f32-42a7-8943-5ee44015ca3e', 'Colaborador elimina solicitud de vacaciones', 'Colaborador elimina solicitud de vacaciones'); 
INSERT INTO privilege(privilegeID, title, summary) values('9a11f693-4932-49c4-8071-20c43480b7ee', 'Colaborador modifica contraseña temporal', 'Colaborador modifica contraseña temporal'); 
INSERT INTO privilege(privilegeID, title, summary) values('20ba4d9c-0b5b-43f5-8dec-060690026d15', 'Colaborador modifica solicitud de vacaciones', 'Colaborador modifica solicitud de vacaciones'); 
INSERT INTO privilege(privilegeID, title, summary) values('d4286531-b61a-4b0e-b134-9910252945a6', 'Colaborador registra ausencia', 'Colaborador registra ausencia'); 
INSERT INTO privilege(privilegeID, title, summary) values('d7f866d9-b91c-4925-ac03-a38704c2d7d7', 'Colaborador registra inicio de sesión', 'Colaborador registra inicio de sesión'); 
INSERT INTO privilege(privilegeID, title, summary) values('8b07bb58-c84f-468e-8159-2c4f7edafd1d', 'Colaborador registra solicitud de vacaciones', 'Colaborador registra solicitud de vacaciones'); 
INSERT INTO privilege(privilegeID, title, summary) values('90720bb3-d2df-4bde-af71-7e8e24bdd02d', 'Líder consulta ausencias de colaborador', 'Líder consulta ausencias de colaborador'); 
INSERT INTO privilege(privilegeID, title, summary) values('c796402f-0939-42eb-b8c8-21a9c8faa9fc', 'Líder consulta colaboradores en su departamento', 'Líder consulta colaboradores en su departamento'); 
INSERT INTO privilege(privilegeID, title, summary) values('52108452-dd0b-42c9-9d1c-df44795c20bf', 'Líder consulta perfil de colaboradores', 'Líder consulta perfil de colaboradores'); 
INSERT INTO privilege(privilegeID, title, summary) values('91bd3edf-0040-46cd-9e69-c04589f10fea', 'Líder consulta solicitudes de vacaciones de colaborador', 'Líder consulta solicitudes de vacaciones de colaborador'); 
INSERT INTO privilege(privilegeID, title, summary) values('26ba18dd-6208-468d-beed-0dd18a058e34', 'Líder registra respuesta hacia ausencia de colaborador', 'Líder registra respuesta hacia ausencia de colaborador'); 
INSERT INTO privilege(privilegeID, title, summary) values('f064fb8f-35cd-4cde-bc24-504c4c26f890', 'Líder registra respuesta hacia solicitud de vacaciones de colaborador', 'Líder registra respuesta hacia solicitud de vacaciones de colaborador'); 
INSERT INTO privilege(privilegeID, title, summary) values('1258107c-ea3d-4fd3-9acc-525cdf21e434', 'Superadmin consulta ausencias de empleado', 'Superadmin consulta ausencias de empleado'); 
INSERT INTO privilege(privilegeID, title, summary) values('ed73c068-3146-4ac3-99e2-1be596032b95', 'Superadmin consulta empleados', 'Superadmin consulta empleados'); 
INSERT INTO privilege(privilegeID, title, summary) values('21d2b459-fc14-4543-baa2-f40d0119e869', 'Superadmin consulta sesión de One-On-One', 'Superadmin consulta sesión de One-On-One'); 
INSERT INTO privilege(privilegeID, title, summary) values('8fd2d592-7b15-4927-bd89-6739f1ef72a3', 'Superadmin consulta solicitudes de vacaciones de empleado', 'Superadmin consulta solicitudes de vacaciones de empleado'); 
INSERT INTO privilege(privilegeID, title, summary) values('58104c99-20f4-4f84-a555-3c0d77536378', 'Superadmin consultar reporte de rotación de empleos mensual', 'Superadmin consultar reporte de rotación de empleos mensual'); 
INSERT INTO privilege(privilegeID, title, summary) values('de6a8234-9ba0-41b0-b103-7d70e452935f', 'Superadmin elimina departamento', 'Superadmin elimina departamento'); 
INSERT INTO privilege(privilegeID, title, summary) values('c1fb2067-de45-473f-a3cf-7284c9391c0c', 'Superadmin elimina día feriado', 'Superadmin elimina día feriado'); 
INSERT INTO privilege(privilegeID, title, summary) values('e2210f77-1a51-4906-bc36-a5b1f8955773', 'Superadmin elimina falta administrativa', 'Superadmin elimina falta administrativa'); 
INSERT INTO privilege(privilegeID, title, summary) values('637978e9-bf70-431b-bdf6-de9a8032ddcb', 'Superadmin modifica datos de empleado', 'Superadmin modifica datos de empleado'); 
INSERT INTO privilege(privilegeID, title, summary) values('a4e0c382-7f8f-4bd2-a60c-2724b31e8687', 'Superadmin modifica departamento', 'Superadmin modifica departamento'); 
INSERT INTO privilege(privilegeID, title, summary) values('46739b47-4adb-4cc1-bab4-c87523a56c5d', 'Superadmin modifica día feriado', 'Superadmin modifica día feriado'); 
INSERT INTO privilege(privilegeID, title, summary) values('2b90e87e-52c1-4dbc-b86c-4af2a056e842', 'Superadmin modifica falta administrativa', 'Superadmin modifica falta administrativa'); 
INSERT INTO privilege(privilegeID, title, summary) values('73d2d2aa-08ef-49d8-a2f0-77403afc926b', 'Superadmin registra alta de empleado', 'Superadmin registra alta de empleado'); 
INSERT INTO privilege(privilegeID, title, summary) values('7f17c492-1c51-486b-b93d-574344a5444d', 'Superadmin registra baja de empleado', 'Superadmin registra baja de empleado'); 
INSERT INTO privilege(privilegeID, title, summary) values('f17c653a-7f14-4409-be92-34214e9e179d', 'Superadmin registra datos del One-On-One', 'Superadmin registra datos del One-On-One'); 
INSERT INTO privilege(privilegeID, title, summary) values('a95f9fe7-63a6-4488-b169-963e2974644f', 'Superadmin registra departamento', 'Superadmin registra departamento'); 
INSERT INTO privilege(privilegeID, title, summary) values('c85b9c1e-39b3-43fc-9481-4740e6f3c39a', 'Superadmin registra día feriado', 'Superadmin registra día feriado'); 
INSERT INTO privilege(privilegeID, title, summary) values('b04ec3a4-b228-49ba-a9d7-4f0cd6290ef1', 'Superadmin registra falta administrativa', 'Superadmin registra falta administrativa'); 
INSERT INTO privilege(privilegeID, title, summary) values('0156be7f-be32-4f58-afa7-f8c68a635e0b', 'Superadmin registra evidencia de falta', 'Superadmin registra evidencia de falta'); 
INSERT INTO privilege(privilegeID, title, summary) values('9cce77f2-8e3f-4faa-a76f-cad4d32e0bdb', 'Superadmin registra fecha prevista de One-On-One', 'Superadmin registra fecha prevista de One-On-One'); 
INSERT INTO privilege(privilegeID, title, summary) values('a3541584-94fb-40c6-94eb-8fdbc256af97', 'Superadmin registra respuesta hacia ausencia de empleado', 'Superadmin registra respuesta hacia ausencia de empleado'); 
INSERT INTO privilege(privilegeID, title, summary) values('76c602f9-8153-4d00-b619-4ebfa9e923b4', 'Superadmin registra respuesta hacia solicitud de vacaciones de empleado', 'Superadmin registra respuesta hacia solicitud de vacaciones de empleado'); 

INSERT INTO role(roleID, title) values('b63fe756-4574-4eed-8d35-53a617347fe7', 'Colaborator'); 
INSERT INTO role(roleID, title) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'Department Leader'); 
INSERT INTO role(roleID, title) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'Manager'); 

INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', 'f767ac50-7874-4894-9819-9debe3008d6b'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', 'aefcbfa4-d93f-4d75-92cd-5b25da30b9ae'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', '8c6d4b5c-9b38-4797-9b64-7ffd839d3fb5'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', 'b15979ff-2e0c-4f0f-b49b-d11bed14b8b3'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', '7e9cb251-44a9-4f31-9d71-5b626ba2fd1e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', '94539e57-ce3a-4f92-9920-65f88c9326aa'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', 'd5db2856-fc2f-4708-a728-784223758d4e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', '61d178d3-3f32-42a7-8943-5ee44015ca3e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', '9a11f693-4932-49c4-8071-20c43480b7ee'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', '20ba4d9c-0b5b-43f5-8dec-060690026d15'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', 'd4286531-b61a-4b0e-b134-9910252945a6'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', 'd7f866d9-b91c-4925-ac03-a38704c2d7d7'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('b63fe756-4574-4eed-8d35-53a617347fe7', '8b07bb58-c84f-468e-8159-2c4f7edafd1d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'f767ac50-7874-4894-9819-9debe3008d6b'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'aefcbfa4-d93f-4d75-92cd-5b25da30b9ae'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '8c6d4b5c-9b38-4797-9b64-7ffd839d3fb5'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'b15979ff-2e0c-4f0f-b49b-d11bed14b8b3'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '7e9cb251-44a9-4f31-9d71-5b626ba2fd1e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '94539e57-ce3a-4f92-9920-65f88c9326aa'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'd5db2856-fc2f-4708-a728-784223758d4e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '61d178d3-3f32-42a7-8943-5ee44015ca3e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '9a11f693-4932-49c4-8071-20c43480b7ee'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '20ba4d9c-0b5b-43f5-8dec-060690026d15'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'd4286531-b61a-4b0e-b134-9910252945a6'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'd7f866d9-b91c-4925-ac03-a38704c2d7d7'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '8b07bb58-c84f-468e-8159-2c4f7edafd1d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '90720bb3-d2df-4bde-af71-7e8e24bdd02d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'c796402f-0939-42eb-b8c8-21a9c8faa9fc'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '52108452-dd0b-42c9-9d1c-df44795c20bf'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '91bd3edf-0040-46cd-9e69-c04589f10fea'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', '26ba18dd-6208-468d-beed-0dd18a058e34'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('451dade0-12cc-4c63-9bbd-25f5dfc41d25', 'f064fb8f-35cd-4cde-bc24-504c4c26f890'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'f767ac50-7874-4894-9819-9debe3008d6b'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'aefcbfa4-d93f-4d75-92cd-5b25da30b9ae'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '8c6d4b5c-9b38-4797-9b64-7ffd839d3fb5'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'b15979ff-2e0c-4f0f-b49b-d11bed14b8b3'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '7e9cb251-44a9-4f31-9d71-5b626ba2fd1e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '94539e57-ce3a-4f92-9920-65f88c9326aa'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'd5db2856-fc2f-4708-a728-784223758d4e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '61d178d3-3f32-42a7-8943-5ee44015ca3e'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '9a11f693-4932-49c4-8071-20c43480b7ee'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '20ba4d9c-0b5b-43f5-8dec-060690026d15'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'd4286531-b61a-4b0e-b134-9910252945a6'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'd7f866d9-b91c-4925-ac03-a38704c2d7d7'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '8b07bb58-c84f-468e-8159-2c4f7edafd1d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '90720bb3-d2df-4bde-af71-7e8e24bdd02d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'c796402f-0939-42eb-b8c8-21a9c8faa9fc'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '52108452-dd0b-42c9-9d1c-df44795c20bf'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '91bd3edf-0040-46cd-9e69-c04589f10fea'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '26ba18dd-6208-468d-beed-0dd18a058e34'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'f064fb8f-35cd-4cde-bc24-504c4c26f890'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '1258107c-ea3d-4fd3-9acc-525cdf21e434'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'ed73c068-3146-4ac3-99e2-1be596032b95'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '21d2b459-fc14-4543-baa2-f40d0119e869'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '8fd2d592-7b15-4927-bd89-6739f1ef72a3'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '58104c99-20f4-4f84-a555-3c0d77536378'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'de6a8234-9ba0-41b0-b103-7d70e452935f'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'c1fb2067-de45-473f-a3cf-7284c9391c0c'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'e2210f77-1a51-4906-bc36-a5b1f8955773'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '637978e9-bf70-431b-bdf6-de9a8032ddcb'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'a4e0c382-7f8f-4bd2-a60c-2724b31e8687'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '46739b47-4adb-4cc1-bab4-c87523a56c5d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '2b90e87e-52c1-4dbc-b86c-4af2a056e842'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '73d2d2aa-08ef-49d8-a2f0-77403afc926b'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '7f17c492-1c51-486b-b93d-574344a5444d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'f17c653a-7f14-4409-be92-34214e9e179d'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'a95f9fe7-63a6-4488-b169-963e2974644f'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'c85b9c1e-39b3-43fc-9481-4740e6f3c39a'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'b04ec3a4-b228-49ba-a9d7-4f0cd6290ef1'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '0156be7f-be32-4f58-afa7-f8c68a635e0b'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '9cce77f2-8e3f-4faa-a76f-cad4d32e0bdb'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', 'a3541584-94fb-40c6-94eb-8fdbc256af97'); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values('43fe7d1c-5907-4076-a16d-8d50106596a2', '76c602f9-8153-4d00-b619-4ebfa9e923b4'); 

INSERT INTO country(countryID, title) values('11bdc0d0-ca12-447b-a043-959dfd25c3d5', 'Mexico'); 
INSERT INTO country(countryID, title) values('50791fff-561b-4008-997c-85003651bc71', 'United States'); 
INSERT INTO country(countryID, title) values('e28d83f0-2f8d-4df1-8c93-e7e08b76db6d', 'Colombia'); 
INSERT INTO country(countryID, title) values('e8981527-c617-444c-bb48-83df0f61b9fc', 'Argentina'); 

INSERT INTO enterprise(enterpriseID, title) values('c1753d69-cba6-4e6d-a796-63e5121e2e94', 'Nuclea'); 
INSERT INTO enterprise(enterpriseID, title) values('1043a6bb-3065-45e9-91ba-cf1525fb54ea', 'ZigZag'); 
INSERT INTO enterprise(enterpriseID, title) values('b55d3862-26c3-4196-ba32-50d51a8584f3', 'WePage'); 
INSERT INTO enterprise(enterpriseID, title) values('d2621be3-1d6c-4b88-a3ba-b0c9008956e4', 'Maya'); 
INSERT INTO enterprise(enterpriseID, title) values('c72dba04-c64e-4c15-8c50-f8d72913a531', 'Moca'); 
INSERT INTO enterprise(enterpriseID, title) values('35ddbcc9-1494-4dd1-b731-702426718891', 'All'); 

INSERT INTO department(departmentID, enterpriseIDFK, title) values('fecd0c76-35ad-4891-a6d9-a114c93058f7', 'c1753d69-cba6-4e6d-a796-63e5121e2e94', 'Backend'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('419cd192-9d45-456b-9705-554d211daf9a', 'c1753d69-cba6-4e6d-a796-63e5121e2e94', 'Frontend'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('622676e1-fb4a-4db3-8eb3-94b3814466ed', 'c1753d69-cba6-4e6d-a796-63e5121e2e94', 'UX/UI'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('ff87a269-40e7-49ff-8b20-a86c79f396a6', 'c1753d69-cba6-4e6d-a796-63e5121e2e94', 'Design'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('fb1e3f6d-9e8b-4323-8ec8-19ddd9b798ba', 'c1753d69-cba6-4e6d-a796-63e5121e2e94', 'BAM'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('76877774-86e2-4234-9968-b0abb45d045e', 'c1753d69-cba6-4e6d-a796-63e5121e2e94', 'Robotics'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('d29eb141-a8da-4188-aefe-77ba5af1b407', '1043a6bb-3065-45e9-91ba-cf1525fb54ea', 'Copywritting'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('af8297db-f69f-48b3-8bc7-b7305cc1c069', '1043a6bb-3065-45e9-91ba-cf1525fb54ea', 'Design'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('ee8f1286-a19e-408b-b43f-f8718b5b827b', '1043a6bb-3065-45e9-91ba-cf1525fb54ea', 'Motion Graphics'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('b0614bc7-1984-4324-a924-0323f8899371', 'b55d3862-26c3-4196-ba32-50d51a8584f3', 'Customer Success'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('57d7ab63-0f3e-48d3-aa72-e22bf55bccbf', 'b55d3862-26c3-4196-ba32-50d51a8584f3', 'Design'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('830ddb60-75fa-4a2d-b966-ddad111c451b', 'b55d3862-26c3-4196-ba32-50d51a8584f3', 'Sales'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('1660c401-7c24-4109-977f-7e0f1e5a587a', 'd2621be3-1d6c-4b88-a3ba-b0c9008956e4', 'Devops'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('306d8fcd-946a-4779-8577-8df62ee29e11', 'd2621be3-1d6c-4b88-a3ba-b0c9008956e4', 'Backend'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('3210a588-6fb7-43d4-844d-144690c1ef55', 'd2621be3-1d6c-4b88-a3ba-b0c9008956e4', 'Blockchain Dev'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('bd68ae37-fe3a-40ae-943e-5b25d74366fb', 'd2621be3-1d6c-4b88-a3ba-b0c9008956e4', 'Comms'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('b3d1951f-715f-46dd-b8c6-ecf7d3f659f8', 'c72dba04-c64e-4c15-8c50-f8d72913a531', 'QA'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('34e882c5-39d4-4e75-afa3-8f6295a76480', 'c72dba04-c64e-4c15-8c50-f8d72913a531', 'Devops'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('a28adeee-0984-41cb-bbd1-4d4b6d635e0a', 'c72dba04-c64e-4c15-8c50-f8d72913a531', 'UX/UI'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('9cd451a0-cf9e-4975-9d8e-70d7ee766149', 'c72dba04-c64e-4c15-8c50-f8d72913a531', 'Backend'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('0623c61e-bf8e-4d47-9556-816ae86ec634', 'c72dba04-c64e-4c15-8c50-f8d72913a531', 'Frontend'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('fe1364ef-4802-4857-a6e7-47a96c1825fe', 'c72dba04-c64e-4c15-8c50-f8d72913a531', 'Comms'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('e78396d7-1be6-42f9-8f3e-ce7bcc81581d', '35ddbcc9-1494-4dd1-b731-702426718891', 'HR'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('618f03db-2a66-44c2-9296-5c0397f67846', '35ddbcc9-1494-4dd1-b731-702426718891', 'Admin'); 
INSERT INTO department(departmentID, enterpriseIDFK, title) values('4d949540-a6f2-4888-b06f-7da69f03dd6d', '35ddbcc9-1494-4dd1-b731-702426718891', 'DS');

INSERT INTO user(userID, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('ca6644c4-66c9-46df-884f-20ed37f3e0e6', 'Admin', 'Admin', 'theFirstAdmin@nuclea.solutions', '$2b$12$c.Zj5/1PciYqJbFcH3VxKOLhAbozT4Zcvb6zq4ofNo5h9KBk1fO.y', FALSE, 44610, '1118 2', 'Mar Mediterráneo', 'Country Club', 1, TRUE, '43fe7d1c-5907-4076-a16d-8d50106596a2', '11bdc0d0-ca12-447b-a043-959dfd25c3d5');
UPDATE user SET prioritaryDepartmentIDFK = 'e78396d7-1be6-42f9-8f3e-ce7bcc81581d' WHERE userID = 'ca6644c4-66c9-46df-884f-20ed37f3e0e6'; 
INSERT INTO workStatus(workStatusID, startDate,endDate, userStatusIDFK) VALUES('05be5aa4-19ab-40c1-8083-65ee7858706f', '2000-01-01', '2099-12-12', 'ca6644c4-66c9-46df-884f-20ed37f3e0e6'); 

INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('7b7b8f4d-95e7-47b5-8e27-2153ced83bbd', 'New Year', '2025-01-01'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('a35ed5a5-071f-44ae-a1ef-c47e0fca4115', 'Constitution Day', '2025-02-05'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('63c9975d-eb4f-4802-b683-0e835304828a', 'Benito Juárez Birthday', '2025-03-21'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('5cd87c79-34a5-4c45-8c23-49872cd118d0', 'Labor Day', '2025-05-01'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('70e76f3d-108c-4a4c-a54a-fdee69bf5bde', 'Independence Day', '2025-09-16'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('bf959730-f3b4-4a2d-82b5-f45e1d9ae6e7', 'Revolution Day', '2025-10-20'); 
INSERT INTO templateHoliday(templateHolidayID, title, holidayDate) values('aabd5f17-8c07-453c-a462-36bc97719061', 'Christmas', '2025-12-25'); 

INSERT INTO oneOnOneQuestion(questionID, question) VALUES('bf332f1f-d788-49ea-9dfb-2ea24bb01135', '¿Cuál va a ser tu meta del mes?'); 
INSERT INTO oneOnOneQuestion(questionID, question) VALUES('a8cf4653-43d9-42eb-8438-1352957ca4c4', '¿Qué vamos hacer para cumplir las metas?'); 
INSERT INTO oneOnOneQuestion(questionID, question) VALUES('f5e7306a-26a4-4a6c-b7f2-dc7e2a5b5c0c', '¿Estás preocupado, decepcionado o estresado?'); 
INSERT INTO oneOnOneQuestion(questionID, question) VALUES('3bc4fe7d-699e-43f9-995e-0d3801f59dcd', '¿A quién quiero reconocer en la semana?'); 

INSERT INTO oneOnOneMeasurable(measurableID, summary) VALUES('a3401a6b-0dd9-4ba1-8f22-0481d3ee1721', 'Reconocimiento: El colaborador se siente poco valorado por sus compañeros'); 
INSERT INTO oneOnOneMeasurable(measurableID, summary) VALUES('b17b32fb-4139-4363-9e29-027b711d64d8', 'Reconocimiento: El colaborador se siente poco valorado por sus compañeros'); 
INSERT INTO oneOnOneMeasurable(measurableID, summary) VALUES('5c880ecb-5277-4ea3-85ee-b3d6cbbf9762', 'Reconocimiento: El colaborador se siente altamente valorado por sus compañeros'); 
INSERT INTO oneOnOneMeasurable(measurableID, summary) VALUES('752bc861-3707-4136-af7e-0f4eab76e5d4', 'Salud fisica El colaborador menciona tener una salud fisica un poco mala'); 
INSERT INTO oneOnOneMeasurable(measurableID, summary) VALUES('76cab43c-0109-47ec-a34c-14df491b247a', 'Salud fisica El colaborador menciona tener una salud fisica un poco mala'); 