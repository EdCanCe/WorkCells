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