import { useEffect, useState } from 'react';
import MovieDetailHeader from './MovieDetailHeader';
import MovieDetailSection from './MovieDetailSection';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { useKeyEvent } from '../hooks/useKeyEvent';

function MovieDetail({
  selectedMovieId,
  onCloseMovie,
  onAddToWatched,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useKeyEvent('Escape', function () {
    onCloseMovie('');
  });

  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === 'Escape') onCloseMovie('');
  //   }
  //   document.addEventListener('keydown', callback);

  //   return () => document.removeEventListener('keydown', callback);
  // }, [onCloseMovie]);

  useEffect(() => {
    async function getSelectedMovie(id) {
      setMessage('');

      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=582fa6&i=${id}`
        );

        if (!res.ok) throw new Error('Somthing Went Wrong,Try Again Later !');

        const data = await res.json();

        if (data.Response === 'False')
          throw new Error('Somthing Went Wrong,Try Again Later !');

        setMovie(data);

        setIsLoading(false);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getSelectedMovie(selectedMovieId);
  }, [selectedMovieId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;
    return () => (document.title = 'Movie Land');
  }, [movie.Title]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {message && <ErrorMessage message={message} />}
      {!isLoading && !message && (
        <>
          <MovieDetailHeader
            selectedMovie={movie}
            onCloseMovie={onCloseMovie}
          />
          <MovieDetailSection
            selectedMovie={movie}
            watchedMovies={watchedMovies}
            onAddToWatched={onAddToWatched}
            onCloseMovie={onCloseMovie}
          />
        </>
      )}
    </div>
  );
}

export default MovieDetail;
