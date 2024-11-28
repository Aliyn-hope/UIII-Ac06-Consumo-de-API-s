let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

if (btnAnterior && btnSiguiente) {
   btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

    btnAnterior.addEventListener('click', () => {
     if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
 });   
}




const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a58ce6048f63f19237c606ffcc5758f1&language=es-MX&page=${pagina}`);


            if (respuesta.ok){
                const datos = await respuesta.json();
                let peliculas = '';

                datos.results.forEach(pelicula => {
                    peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            
            document.getElementById('contenedor').innerHTML = peliculas;
        } else {
        
            if (respuesta.status === 401) {
                console.error('Error: API Key incorrecta'); 
            } else if (respuesta.status === 404) {
                console.error('Error: Página no encontrada'); 
            } else {
                console.error('Error: Hubo un problema desconocido y no sabemos que sucedio'); 
            }
        }
        
    } catch (error) {
        console.log(error);
    }
};

cargarPeliculas();
