document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("movie-search");
  const resultsContainer = document.getElementById("movie-results");

  const OMDB_API_KEY = "thewdb"; // ✅ Working free key

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      searchMovies(query);
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

  async function searchMovies(title) {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(title)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        resultsContainer.innerHTML = `<p>No results found for "<strong>${title}</strong>".</p>`;
      }
    } catch (error) {
      resultsContainer.innerHTML = `<p>Error fetching data. Check your connection.</p>`;
      console.error("Fetch error:", error);
    }
  }

  function displayMovies(movies) {
    resultsContainer.innerHTML = "";
    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img class="movie-poster" src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${movie.Title}" />
        <div class="movie-info">
          <div class="movie-title">${movie.Title}</div>
          <div class="movie-year">Year: ${movie.Year}</div>
        </div>
      `;
      resultsContainer.appendChild(card);
    });
  }
});
