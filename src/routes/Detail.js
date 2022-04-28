import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovies] = useState(0);
  const { id } = useParams();
  const getMovies = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getMovies();
  }, [getMovies, id]);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Movie
            id={movie.id}
            url={movie.url}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres}
          />
          <a href={movie.url} target="_blank">
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default Detail;
