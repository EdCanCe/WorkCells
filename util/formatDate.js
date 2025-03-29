function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // handles 11th, 12th, 13th, etc.
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

module.exports = {
    formatDateWithOrdinal: (dateString) => {
        try {
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
    }
};