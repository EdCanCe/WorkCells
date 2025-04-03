/**
 * Regresa el valor de una cookie dependiendo de su nombre.
 * 
 * @param string name   El nombre de la cookie 
 * @returns El valor de la cookie
 */
const getCookieByName = (name) => {
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) {
        return match[2];
    }
    return null;
};