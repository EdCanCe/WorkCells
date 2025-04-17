// Agregar la hoja de estilos de Leaflet
const leafletCSS = document.createElement('link');
leafletCSS.rel = 'stylesheet';
leafletCSS.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
document.head.appendChild(leafletCSS);

// Agregar el script de Leaflet
const leafletScript = document.createElement('script');
leafletScript.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
leafletScript.onload = () => {
    // Ya se cargó Leaflet, puedes empezar a usarlo aquí
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
};
document.body.appendChild(leafletScript);

/**
 * Función para obtener el estado y ciudad, así como la dirección del usuario
 * 
 * @param string apiKey     La key para usar la API de geoapify
 * @param string street     La calle del usuario
 * @param string houseNum   El número de la casa del usuario
 * @param string colony     La colonia del usuario
 * @param string zipCode    El código postal del usuario
 * @param string country    El país del usuario
*/
const getAdress = (apiKey, street, houseNum, colony, zipCode, country) => {
    // Realiza la consulta a la API
    return fetch(`https://api.geoapify.com/v1/geocode/search?text=${street} ${houseNum}, ${zipCode}, ${country}&apiKey=${apiKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => {
        return result.json();
    }).then((data) => {
        //console.log(`https://api.geoapify.com/v1/geocode/search?text=${street} ${houseNum}, ${zipCode}, ${country}&apiKey=${apiKey}`);

        // Obtiene la ciudad y estado
        const city = data.features[0].properties.county;
        const state = data.features[0].properties.state;

        // Son coordenadas no tan confiables, solo si no se encuentran se usarán
        const lat = data.features[0].properties.lat;
        const lon = data.features[0].properties.lon;

        // Regresa los valores
        return {
            city,
            state,
            lat,
            lon,
            display: `${street} ${houseNum}, Col. ${colony}. ${city}, ${state}, ${country}. ${zipCode}`,
        }
    }).catch(() => {
        throw new Error('It was not possible to retrieve the address data.');
    });
};

/**
 * Función para obtener el mapa de la dirección del usuario
 * 
 * @param string street     La calle del usuario
 * @param string houseNum   El número de la casa del usuario
 * @param string colony     La colonia del usuario
 * @param string zipCode    El código postal del usuario
 * @param string city       El país del usuario
 * @param string state      El país del usuario
 * @param string country    El país del usuario
*/
const getCoords = (street, houseNum, colony, zipCode, city, state, country) => {
    return fetch(`https://nominatim.openstreetmap.org/search.php?street=${houseNum} ${street}&county=${city}&state=${state}&country=${country}&postalcode=${zipCode}&accept-language=en-US%2Cen&format=jsonv2`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((result) => {
        return result.json();
    }).then((data) => {
        // Verifica que si haya datos
        if (data[0].lat === undefined) {
            throw new Error('It was not possible to retrieve the map data.');
        }

        // Obtiene latitud y longitud
        const lat = data[0].lat;
        const lon = data[0].lon;

        return {
            lat,
            lon,
        }
    }).catch((error) => {
        throw new Error('It was not possible to retrieve the map data.');
    });
}

/**
 * Función para renderizar el mapa.
 * 
 * @params number lat   La latitud de la posición
 * @params number lon   La longitud de la posición
 * @params string fullAdress    La dirección como mensaje
*/
const showMap = (mapContainer, lat, lon, fullAdress) => {
    if (lat === undefined) {
        throw new Error('It was not possible to retrieve the map data.');
    }

    let map;

    // Agrega un contenedor para renderizar el mapa
    mapContainer.innerHTML = '<div id="mapRender" class="w-full min-h-[200px] rounded-lg"></div>'

    // Crea el mapa
    map = L.map('mapRender').setView([lat, lon], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Añade un marcador al mapa con la dirección
    L.marker([lat, lon]).addTo(map)

    // Le añade la dirección como popup y lo abre
    .bindPopup(fullAdress)
    .openPopup();
}

/**
 * Función para obtener el mapa y dirección del usuario
 * 
 * @param string apiKey     La key para usar la API de geoapify
 * @param element adressHtml        El contenedor de la dirección
 * @param element mapContainerHtml      El contenedor del mapa
 * @param string street     La calle del usuario
 * @param string houseNum   El número de la casa del usuario
 * @param string colony     La colonia del usuario
 * @param string zipCode    El código postal del usuario
 * @param string country    El país del usuario
*/
const addressLoader = (apiKey, adressHtml, mapContainerHtml, street, houseNum, colony, zipCode, country) => {
    // Muestra mensaje para que el usuario sepa que se está realizando la petición
    adressHtml.innerHTML = "Waiting for result...";
    getAdress(apiKey, street, houseNum, colony, zipCode, country)
        .then((fullAdress) => {
            // Renderiza la dirección
            adressHtml.innerHTML = fullAdress.display;

            // Muestra mensaje para que el usuario sepa que se está realizando la petición
            mapContainerHtml.innerHTML = 'Waiting for results..';

            // Obtiene el mapa de la dirección
            getCoords(street,houseNum,colony,zipCode,fullAdress.city,fullAdress.state,country)
                .then((coords) => {
                    showMap(mapContainerHtml, coords.lat, coords.lon, fullAdress.display);
                }).catch((error) => {
                    try {
                        showMap(mapContainerHtml, fullAdress.lat, fullAdress.lon, fullAdress.display)
                    } catch (error) {
                        mapContainerHtml.innerHTML = error.message;
                    }
                });      
        }).catch((error) => {
            adressHtml.innerHTML = error.message;
        });
}