# Convención de codificación para πnu

En éste documento se redacta la convención de codificación que adopta πnu para la codificación web.

Los lenguajes que adoptarán éstas convenciones de codificación serán:
 - HTML
 - JS

## Tabla de contenidos:

1. [Objetos](#objetos)  

1. [Arreglos](#arreglos)  

1. [Strings](#strings)  

1. [Funciones](#funciones)  

1. [Funciones de flecha](#funciones-de-flecha)  

1. [Variables](#variables)  

1. [Declaraciones de control](#declaraciones-de-control)  

1. [Operadores de comparación](#operadores-de-comparación)  

1. [Comentarios](#comentarios)  

1. [Espacios en blanco](#espacios-en-blanco)  

1. [Comas](#comas)  

1. [Convención de nombres](#convención-de-nombres)  

1. [Llamadas a base de datos](#llamadas-a-base-de-datos)

1. [Uso de etiquetas](#uso-de-etiquetas)


## Objetos:
 - Al añadir funciones dentro de un objeto, no definir que es una función.
 
    ```js
    // mal
    const obj = {
        valor: 1,

        anadir: function (valor) {
            return obj.valor + valor;
        },
    };

    // bien
    const obj = {
        valor: 1,

        anadir(valor) {
            return obj.valor + valor;
        },
    };
    ```

 - Al añadirle atributos al objeto, si tiene el mismo nombre que la variable, no repetirlo, solo abreviarlo.

    ```js
    const nombre = 'Juan Pérez';

    // mal
    const obj = {
        nombre: nombre,
    };

    // bien
    const obj = {
        nombre,
    };
    ```

 - Al añadir atributos abreviados a un objeto, ponerlos al inicio de la declaración del mismo.

    ```js
    const nombre = 'Juan';
    const apellido = 'Pérez';

    // mal
    const obj = {
        edad: 20,
        direccion: 'Calle Azul 20',
        nombre,
        peso: 68,
        apellido,
    };

    // bien
    const obj = {
        nombre,
        apellido,
        edad: 20,
        direccion: 'Calle Azul 20',
        peso: 68,
    };

## Arreglos:
 - Al declarar arreglos, solo marcarlo con corchetes.

    ```js
    // mal
    const elementos = new Array();

    // bien
    const elementos = [];
    ```

 - Para añadirle nuevos elementos al arreglos usar push.

    ```js
    const elementos = [];

    // mal
    elementos[elementos.length] = 'elemento123';

    // bien
    elementos.push('elemento123');
    ```

 - Para copiar arreglos, usar `...`.

    ```js
    // mal
    const lon = elementos.length;
    const conCopia = [];

    for (let i = 0; i < lon; i++) {
        conCopia[i] = elementos[i];
    }

    // bien
    const conCopia = [...elementos];
    ```

 - Solo si un arreglo tiene múltiples líneas, agregar saltos de líneas en los corchetes de inicio y cierre.

    ```js
    // mal
    const elementos = [
        [10, 9], [5, 4], [1, 0],
    ];

    const arreglo = [
        'elemento 1', 'elemento 2',
    ];

    // bien
    const elementos = [[10, 9], [5, 4], [1, 0]];

    const arreglo = [
        'elemento 1',
        'elemento 2',
    ];
    ```

## Strings:

 - Usa comillas simples para strings.

    ```js
    // mal
    const texto = "texto";

    // mal
    const masTexto = `texto`;

    // bien
    const texto = 'texto';
    ```

 - En caso de querer añadir variables a la string, usar plantillas literales.

    ```js
    // mal
    const miNombre = (nombre, apellido) => {
        return 'Mi nombre es ' + nombre + ' ' + apellido;
    }

    // bien
    const miNombre = (nombre, apellido) => {
        return `Mi nombre es ${nombre} ${apellido}`;
    }
    ```

 - En caso de tener una string muy larga, se puede separar mientras se conserve la identación original.

    ```js
    // mal
    function funcion() {
        const texto = 'este es un texto muy muy largo que si lo sigo leyendo se me va hacer muy difícil leerlo completo.';
    }

    // mal
    function funcion() {
        const texto = `este es un texto muy muy largo 
    que si lo sigo leyendo se me va 
    hacer muy difícil leerlo completo.`;
    }

    // bien
    function funcion() {
        const texto = `este es un texto muy muy largo 
        que si lo sigo leyendo se me va 
        hacer muy difícil leerlo completo.`;
    }
    ```

## Funciones:

 - Envés de asignarle valores a variables que no se hayan pasado como atributo, asignarles un valor por defecto en la declaración de la función.

    ```js
    // mal
    function funcion (elementos) {
        elementos = elementos || {};
        // ...
    }

    // mal
    function funcion (elementos) {
        if (elementos === void) {
            elementos = {};
        }
        // ...
    }

    // bien
    function funcion (elementos = {}) {
        // ...
    }
    ```

 - Poner los atributos por defecto al final de los parámetros.

    ```js
    // mal
    function funcion (nombre, edad = 18, apellido) {
        // ...
    }

    // bien
    function funcion (nombre, apellido, edad = 18) {
        // ...
    }
    ```

 - Usar espacios para separar los paréntesis de las llaves.

    ```js
    // mal
    function funcion(){
        // ...
    }

    // bien
    function funcion() {
        // ...
    }
    ```

## Funciones de flecha:

 - Cuando se ocupe usar una función anónima, usar funciones de flecha.

    ```js
    // mal
    arreglo.forEach(function (elemento) {
        // ...
    });

    // bien
    arreglo.forEach((elemento) => {
        // ...
    });
    ```

 - Siempre añadir paréntesis a los parámetros usados.

    ```js
    // mal
    const saludar = persona => {
        console.log(persona);
    };

    // bien
    const saludar = (persona) => {
        console.log(persona);
    };
    ```

## Variables:

 - Por nada del mundo usar `var`; en caso de que se quiera tener una variable que pueda cambiar de valor en un futuro usar `let`, pero en caso de ser posible usar `const`.

    ```js
    // mal
    var a = 6;
    a = 10;

    // bien
    let a = 6;
    a = 10;
    const b = a + 4:
    ```

 - Agrupa todos los `const`, y posteriormente los `let`.

    ```js
    // mal
    let a = 10;
    const b = 15;
    let c = 20;
    const d = 25;
    
    // bien
    const b = 15;
    const d = 25;
    let a = 10;
    let c = 20;
    ```

 - Declara las variables donde las ocupes, pero en un lugar razonable.
    
    ```js
    // mal
    const mayorEdad = (edad) => {
        const nombre = getNombre(edad);

        if (edad > 18) {
            return true;
        }

        console.log(nombre);

        return false;
    };

    // bien
    const mayorEdad = (edad) => {
        if (edad > 18) {
            return true;
        }

        const nombre = getNombre(edad);
        console.log(nombre);

        return false;
    };
    ```

 - No asignes variables en cadena.

    ```js
    // mal
    let a;
    let b;
    let c = b = a = 10;

    // bien
    let a = 10;
    let b = a;
    let c = a;
    ```

## Declaraciones de control:

 - Separar los paréntesis de la palabra reservada y las llaves con espacio.

    ```js
    // mal
    if(esVerdad()){
        // ...
    }

    // bien
    if (esVerdad()) {
        // ...
    }
    ```

 - Separar cada condición con espacios.

 - Si tus declaraciones de control terminan siendo muy largas, separarlo en varias líneas, y asegúrate de que inicien con su operador lógico y se separen las condiciones del inicio y cierre de la declaración.

    ```js
    // mal
    if ( condUno() && condDos() && condTres() ) {
        // ...
    }

    // mal
    if ( 
        condUno() && 
        condDos() && 
        condTres() 
    ) {
        // ...
    }

    // mal
    if ( condUno() 
        && condDos() 
        && condTres() ) {
        // ...
    }

    // bien
    if ( 
        condUno() 
        && condDos() 
        && condTres() 
    ) {
        // ...
    }
    ```

## Operadores de comparación:

 - Mejor usa operadores como `===` y `!==` envés de `==` o `!=`.

 - Abrevia los valores o funciones booleanas, pero se explícito con cadenas y números.

    ```js
    // mal
    if (esVerdarero() === true) {
        // ...
    }

    // bien
    if (esVerdarero()) {
        // ...
    }

    // mal
    if (nombre) {
        // ...
    }

    // bien
    if (nombre !== '') {
        // ...
    }
    ```

 - Los operadores ternarios deben de ser escritos en una sola línea.

    ```js
    // mal
    const valorFinal = valor1 > valor2
    ? valor1
    : valor2;

    // bien
    const valorFinal = valor1 > valor2 ? valor1 : valor2; 
    ```

## Comentarios:

 - Inicia cada comentario con un espacio para que sea fácil de leer.

    ```js
    // mal
    //esto es mi comentario

    // bien
    // esto es mi comentario
    ```

 - Utiliza `/** ... **/` para comentarios de varias líneas.

    ```js
    // mal
    // Voy a hacer varios comentarios
    // Comentario 1
    // Comentario 2

    // bien
    /**
     * Voy a hacer varios comentarios
     * Comentario 1
     * Comentario 2
    */
    ```

 - Utiliza `//` para comentarios de una sola línea. Pon una línea vacía antes del comentario a menos de que sea la primer línea del bloque.

    ```js
    // mal
    if (esVerdadero) {

        // Significa que es verdadero
        const cero = 0;
        // Le pongo un valor
        const uno = 1;
    }

    // bien
    if (esVerdadero) {
        // Significa que es verdadero
        const cero = 0;

        // Le pongo un valor
        const uno = 1;
    }
    ```

## Espacios en blanco:

 - Utiliza 4 espacios por cada tabulación.

    ```js
    // mal
    if (esVerdadero()) {
      if (esVerdadero()) {
        if (esVerdadero()) {
            // ...
        }
      }
    }

    // bien
    if (esVerdadero()) {
        if (esVerdadero()) {
            if (esVerdadero()) {
                // ...
            }
        }
    }
    ```

 - Al asignarle un valor a una variable, separar con espacios cada valor y operador.

    ```js
    // mal
    const suma=10+20+30;

    // mal
    const suma = 10+20+30;

    // bien
    const suma = 10 + 20 + 30;
    ```

 - Si se llama una función después de otra, declararla en la siguiente línea con una tabulación.

    ```js
    // mal
    document.getElementById('id').classList.add('class');

    // bien
     document.getElementById('id')
        .classList
        .add('class');
    ```

 - Deja una línea en blanco al término de cada bloque.

    ```js
    // mal
    if (esVerdadero()) {
        // ...
    }
    if (esFalso()) {
        // ...
    }

    // bien
    if (esVerdadero()) {
        // ...
    }

    if (esFalso()) {
        // ...
    }
    ```

## Comas:

 - Al tener varios elementos en diferentes líneas, poner coma al final de todas las líneas (también la final).

    ```js
    // mal
    const persona = {
        nombre: 'Juan'
        , apellido: 'Pérez'
        , edad: 18
    }

    // mal
    const persona = {
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 18
    }

    // bien
    const persona = {
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 18,
    }
    ```

## Convención de nombres:

 - No crees nombres de una sola letra, sé más descriptivo.

    ```js
    // mal
    const q = '...';
    const a = [];
    const v = 0;

    // bien
    const querie = '...';
    const array = [];
    const valor = 0;
    ```

 - Usa camelCase al nombrar archivos, objetos, funciones, variables, etc.

    ```js
    // mal
    const UnaVariable = 10;
    
    // mal
    const una_variable = 10;

    // bien
    const unaVariable = 10;
    ```

 - Usa PascalCase al nombrar la creación de clases.

    ```js
    // mal
    class modeloObjeto {
        // ...
    }

    // bien
    class ModeloObjeto {
        // ...
    }
    ```

 - Usa SCREAMING_SNAKE_CASE al nombrar las variables del `.env`.

    ```js
    // mal
    apiKey = ...
    api_key = ...

    // bien
    API_KEY = ...
    ```

## Llamadas a base de datos:

 - Al usar 2 o menos funciones que interactúen con la base de datos, hacerlo con `.then`.

    ```js
    // mal
    exports.getRoot = async (request, response, next) => {
        try {
            const [rows1] = await tabla1.fetchByID('...');
            const [rows2] = await tabla2.fetchByID('...');

            // ...
        }
    };

    // bien
    exports.getRoot = (request, response, next) => {
        tabla1.fetchByID('...')
            .then(([rows1]) => {
                tabla2.fetchByID('...')
                    .then(([rows2]) => {
                        // ...
                    })
            })
    };
    ```

 - Al usar 3 o más funciones que interactúen con la base de datos, hacerlo con una función asíncrona.

    ```js
    // mal
    exports.getRoot = (request, response, next) => {
        tabla1.fetchByID('...')
            .then(([rows1]) => {
                tabla2.fetchByID('...')
                    .then(([rows2]) => {
                        tabla3.fetchByID('...')
                            .then(([rows3]) => {
                                tabla4.fetchByID('...')
                                    .then(([rows4]) => {
                                        // ...
                                    })
                            })
                    })
            })
    };

    // bien
    exports.getRoot = async (request, response, next) => {
        try {
            const [rows1] = await tabla1.fetchByID('...');
            const [rows2] = await tabla2.fetchByID('...');
            const [rows3] = await tabla3.fetchByID('...');
            const [rows4] = await tabla4.fetchByID('...');

            // ...
        }
    };

## Uso de etiquetas:

 - Si la etiqueta solo tiene un atributo adentro hacerlo de una lína.

    ```html
    <!-- mal -->
    <a 
        href='/otra'
    >
        Enlace
    </a>

    <!-- bien -->
    <a href='/otra'>Enlace</a>
    ```

 - Si la etiqueta tiene varios atributos adentro, separarlos por cada línea e incluir el inicio y cierre de la etiqueta únicos en su línea.

    ```html
    <!-- mal -->
    <a href='/otra' class='button'>Enlace</a>

    <!-- bien -->
    <a 
        href='/otra'
        class='button'
    >
        Enlace
    </a>
    ```
    