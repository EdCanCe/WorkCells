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