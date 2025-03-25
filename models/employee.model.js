const db = require("../util/database"); // Importar la conexión
const { v4: uuidv4 } = require("uuid");

module.exports = class Employee {
  constructor(
    curp,
    rfc,
    birthName,
    surname,
    mail,
    zipCode,
    houseNumber,
    streetName,
    colony,
    workModality,
    userRoleIDFK,
    countryUserIDFK
  ) {
    this.curp = curp;
    this.rfc = rfc;
    this.birthName = birthName;
    this.surname = surname;
    this.mail = mail;
    this.zipCode = zipCode;
    this.houseNumber = houseNumber;
    this.streetName = streetName;
    this.colony = colony;
    this.workModality = workModality;
    this.userRoleIDFK = userRoleIDFK;
    this.countryUserIDFK = countryUserIDFK;
  }

  save() {
    // Validación de CURP
    if (
      !/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/.test(this.curp.toUpperCase())
    ) {
      return Promise.reject(
        new Error("CURP inválido. Debe contener 18 caracteres alfanuméricos.")
      );
    }

    // Validación de RFC (12 o 13 caracteres)
    if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/.test(this.rfc.toUpperCase())) {
      return Promise.reject(
        new Error("RFC inválido. Debe contener 13 caracteres alfanuméricos.")
      );
    }
    const userID = uuidv4();
    const passwd = "1234"; // Considera usar un hash para seguridad
    const passwdFlag = false;
    const workStatus = true;

    const checkUserQuery = `SELECT userID FROM user WHERE curp = ? OR rfc = ?`;

    return db
      .execute(checkUserQuery, [this.curp, this.rfc])
      .then(([rows]) => {
        if (rows.length > 0) {
          // El usuario ya existe, evitar el registro
          throw new Error(
            "El usuario que intento registrar ya está registrado."
          );
        }

        // Si no existe, proceder con la inserción
        const query = `
          INSERT INTO user(
            userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, 
            streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK
          ) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return db.execute(query, [
          userID,
          this.curp.toUpperCase(),
          this.rfc.toUpperCase(),
          this.birthName,
          this.surname,
          this.mail,
          passwd,
          passwdFlag,
          this.zipCode,
          this.houseNumber,
          this.streetName,
          this.colony,
          this.workModality,
          workStatus,
          this.userRoleIDFK,
          this.countryUserIDFK,
        ]);
      })
      .catch((error) => {
        console.error("Error al guardar el usuario:", error.message);
        throw error;
      });
  }
  static fetchCountry() {
    return db.execute(`SELECT * FROM country`);
  }
};
