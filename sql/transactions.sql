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