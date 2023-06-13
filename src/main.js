const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': API_KEY,
  }
});

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

  // Funcion para obtener las categorias
  async function getCategegoriesPreview() {
    // Se utiliza la instancia api de axios la cual tiene la url base esta concatena la url que le ponemos abajo y el api key lo envia como un params. axios ya guarda la respuesta en formato JSON por lo que no se debe convertir.
    const {data} = await api('genre/movie/list');
    // Se guarda la respuesta en la variable categories
    const categories = data.genres;
    // recorremos el objeto categories
    categories.forEach(category => {
      // seleccionamos el elemento HTML con id categoriesPreview y que dentro tenga un elemento con clase categoriesPreview-list
      const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

      // creamos un elemento de tipo DIV y se le añade la clase category-container
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      // Se crea un elemento H3 y se le añade la clase category-title
      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      // Se concatena el string id con el elemento id de la respuesta del api
      categoryTitle.setAttribute('id', 'id' + category.id);
      // con create Text Node se puede modificar el texto.
      const categoryTitleText = document.createTextNode(category.name);

      // Se mete el texto del titulo en el h3
      categoryTitle.appendChild(categoryTitleText);
      //se mete el h3 en el div
      categoryContainer.appendChild(categoryTitle);
      // Se mete el div en el section
      previewCategoriesContainer.appendChild(categoryContainer);
    });
  }

  getTrendingMoviesPreview();
  getCategegoriesPreview();