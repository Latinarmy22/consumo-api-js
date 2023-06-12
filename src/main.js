// Funcion para obtener las peliculas en tedencia.
async function getTrendingMoviesPreview() {
    // asincrona: concaena el endpoint que se va a consumir se recibe day como query parameter y se concatena la variable API_KEY
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    //Se pasa la respuesta a JSON
    const data = await res.json();

    //Guarda en la variables movies el array results que esta dentro del objeto data.
    const movies = data.results;
    // recorre el array de reults
    movies.forEach(movie => {
    // obtiene en la variable trendingPreviewMoviesContainer el elemento con la clase trendingPreview-movieList que este dentro del elemento con ID trendingPreview
      const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

    // Crea un elemento DIV y le añade la clase movie-container
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

    //   Crea un elemento de tipo img, le añade la clase movie-img, setea el atributo ALT con el nombre de la pelicula que viene en el array data.movie, setea el atributo src con el link base y concatena el resto de la URL, que viene en el elemento poster_path del array movie
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );

    //   mete dentro de movie container el elemento movieimg
      movieContainer.appendChild(movieImg);
    //   mete dentro del elemento trendingPreviewMoviesContainer el elemento movieContainer que ya tiene el elemento movieImg
      trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
  }

  getTrendingMoviesPreview();