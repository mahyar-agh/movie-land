import { useState } from 'react';
import StarRating from './../StarRating/StarRating';

function MovieDetailSection({
  selectedMovie,
  watchedMovies,
  onAddToWatched,
  onCloseMovie,
}) {
  const [rate, setRate] = useState(null);

  const isWatched = watchedMovies.some(
    movie => movie.imdbID === selectedMovie.imdbID
  );

  const watchesUserRating = watchedMovies.find(
    movie => movie.imdbID === selectedMovie.imdbID
  )?.userRating;

  const {
    Actors: actors,
    Director: director,
    Poster: poster,
    Year: year,
    Plot: plot,
    Title: title,
    imdbRating,
    Runtime: runtime,
    imdbID,
  } = selectedMovie;

  function handleWatchMovie() {
    const newWatchedMovie = {
      title,
      poster,
      year,
      imdbRating: +imdbRating,
      runtime: Number.parseInt(runtime),
      imdbID,
      userRating: rate,
    };
    onAddToWatched(newWatchedMovie);
    onCloseMovie('');
  }

  return (
    <section>
      <div className="rating">
        {!isWatched ? (
          <>
            <StarRating maxRate={10} size={25} onSetRate={setRate} />
            {rate > 0 && (
              <button className="btn-add" onClick={handleWatchMovie}>
                + Add To List
              </button>
            )}
          </>
        ) : (
          <p>
            You have rated this movie {watchesUserRating} <span>⭐️</span>
          </p>
        )}
      </div>
      <p>
        <em>{plot}</em>
      </p>
      <p>&#127776; Starring {actors}</p>
      <p>&#127917; Directed by {director}</p>
      <button className="btn-add">Details</button>
    </section>
  );
}

export default MovieDetailSection;
