import { useEffect, useState, useRef } from 'react';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import MovieSummary from './components/MovieSummary';
import WatchMovieList from './components/WatchMovieList';
import Search from './components/NavBar/Search';
import NumResults from './components/NavBar/NumResults';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetail from './components/MovieDetail/MovieDetail';
import { useLocalStorageState } from './components/hooks/useLocalStorageState';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = '582fa6';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  function handleSelectMovie(id) {
    setSelectedId(selectedId => (selectedId === id ? null : id));
  }

  function handleAddToWatched(movie) {
    setWatched(movies => [...movies, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched(movies => movies.filter(movie => movie.imdbID !== id));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      async function getMovies() {
        try {
          setMessage('');
          setIsLoading(true);

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) throw new Error('Somthing Went Wrong,Try Again Later !');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie Not Found !');

          setMovies(data.Search);
          setSelectedId('');
        } catch (err) {
          setMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setMessage('');
        return;
      }
      getMovies();
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {message && <ErrorMessage message={message} />}
          {!isLoading && !message && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedMovieId={selectedId}
              onCloseMovie={setSelectedId}
              onAddToWatched={handleAddToWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
