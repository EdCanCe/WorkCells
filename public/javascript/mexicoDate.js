/**
 * Obtiene la fecha actual de México en ese momento
 * 
 * @returns     La fecha en horario mexicano
 */
const mexicoDate = () => {
    const date = new Date();
    return new Date(date.getTime() - (6 * 60 * 60 * 1000));
}