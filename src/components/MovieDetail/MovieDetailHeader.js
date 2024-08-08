function MovieDetailHeader({ selectedMovie, onCloseMovie }) {
  const {
    Poster: poster,
    Title: title,
    Released: released,
    imdbRating,
    Runtime: runtime,
    Genre: genre,
  } = selectedMovie;

  return (
    <header>
      <button className="btn-back" onClick={() => onCloseMovie('')}>
        &larr;
      </button>
      <img src={poster} alt={`poster of the ${title} movie`} />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>{genre}</p>
        <p>
          <span>⭐️</span>
          {Number(imdbRating).toFixed(1)} IMDb Rating
        </p>
      </div>
    </header>
  );
}

export default MovieDetailHeader;
