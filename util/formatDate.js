/**
 * Obtiene el sufijo de un día en inglés.
 * 
 * @param int day   El número del día en el mes 
 * @returns     El día con su sufijo.
 */
const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

/**
 * Convierte una fecha plana a una fecha en texto.
 * 
 * @param string dateString     La fecha plana. 
 * @returns     La fecha en texto.
 */
exports.withOrdinal = (dateString) => {
    try {
        // Convierte la fecha plana a variable tipo fecha
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const suffix = getOrdinalSuffix(day);

        return `${month} ${day}${suffix}, ${year}`;
    } catch (error) {
        console.error('Date formatting error:', error);
        return 'Invalid Date';
    }
};


// Formatea las fechas para ser usadas en SQL
exports.forSql = (date) => {
    return date.toISOString().split('T')[0];
};