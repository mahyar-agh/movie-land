function WatchMovie({ movie, onDeleteWatched }) {
  const { poster, title, imdbRating, userRating, runtime, imdbID } = movie;

  return (
    <li key={movie.imdbID}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>🕒</span>
          <span>{runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDeleteWatched(imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

export default WatchMovie;
