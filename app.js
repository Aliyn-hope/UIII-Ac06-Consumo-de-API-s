// Empezamos en la página 1, que será nuestra página inicial para mostrar películas.
let pagina = 1;

// Buscamos los botones "Anterior" y "Siguiente" del DOM. En el HTML para poder usarlos más adelante.
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Nos aseguramos de que los botones existan antes de tratar de usarlos.
if (btnAnterior && btnSiguiente) {
    // Cuando se haga clic en el botón "Siguiente", queremos pasar a la siguiente página.
    btnSiguiente.addEventListener('click', () => {
        // Solo avanzamos si no hemos llegado al límite de 1000 páginas.
        if (pagina < 1000) {
            pagina += 1; // Aumentamos el número de la página en 1.
            cargarPeliculas(); // Llamamos a la función que se encarga de cargar las películas de esa nueva página.
        }
    });

    // Cuando se haga clic en el botón "Anterior", queremos volver a la página anterior.
    btnAnterior.addEventListener('click', () => {
        // Solo retrocedemos si no estamos ya en la primera página.
        if (pagina > 1) {
            pagina -= 1; // Reducimos el número de la página en 1.
            cargarPeliculas(); // Llamamos a la función para cargar las películas de la página anterior.
        }
    });
}

// Esta función es la encargada de traer las películas desde la API y mostrarlas en la página.
const cargarPeliculas = async () => {
    try {
        // Hacemos una solicitud a la API para obtener las películas populares.
        // Le pasamos la página actual para que nos devuelva los resultados correspondientes.
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a58ce6048f63f19237c606ffcc5758f1&language=es-MX&page=${pagina}`);

        // Si la respuesta de la API es exitosa (código 200), seguimos adelante.
        if (respuesta.ok) {
            const datos = await respuesta.json(); // Convertimos la respuesta en JSON para poder trabajar con ella.
            let peliculas = ''; // Aquí vamos a construir el HTML que mostrará las películas.

            // Recorremos todas las películas que nos regresó la API.
            datos.results.forEach(pelicula => {
                // Por cada película, creamos un bloque de HTML con su póster e información básica.
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            // Metemos todo ese HTML en el contenedor de películas en la página.
            document.getElementById('contenedor').innerHTML = peliculas;
        } else {
            // Si algo salió mal, identificamos el error según el código de respuesta.
            if (respuesta.status === 401) {
                console.error('Error: Parece que la API Key no es correcta.'); 
            } else if (respuesta.status === 404) {
                console.error('Error: No encontramos lo que estabas buscando.'); 
            } else {
                console.error('Error: Algo inesperado ocurrió y no sabemos qué fue.'); 
            }
        }
    } catch (error) {
        // Si hubo un problema en la conexión o algo que no manejamos bien, mostramos el error.
        console.log(error);
    }
};

// Llamamos a esta función de inmediato para cargar la primera página de películas al abrir la aplicación.
cargarPeliculas();
