import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Logo from "../../components/Common/Header/Logo";
import { CalendarIcon, HomeIcon, ListIcon, MovieIcon, OutIcon, TVIcon } from "../../components/Common/Icons";
import MovieTag from "../../components/MovieTag";
import axios from 'axios'

const Movies = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<any>({});
  const [genres, setGenres] = useState<any>({});

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if(id) {
        const tmpMovie = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'?api_key=27a4af714a325a89bbec17754ad3a8ef')
        console.log(tmpMovie.data.backdrop_path);
        setMovie(tmpMovie.data);
      }
      let tmpGenres = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=27a4af714a325a89bbec17754ad3a8ef');
      const copiedGenres: any = {};
      for(let genre of tmpGenres.data.genres) {
        copiedGenres[genre.id] = genre.name;
      }
      setGenres(copiedGenres);
    }
    fetchMovieDetail()
  }, [id])
  return (
    <div>
      <Head>
        <title>Moviebox</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='container-fluid p-0'>
          <div className="detail-layout">
            <div className="detail-sidebar">
              <div className="d-flex align-items-center detail-logo">
                <Logo />
                <h1 className="detail-title">MovieBox</h1>
              </div>
              <div className="detail-menu">
                <ul>
                  <li><HomeIcon /><span>Home</span></li>
                  <li className="active"><MovieIcon /><span>Movies</span></li>
                  <li><TVIcon /><span>TV Series</span></li>
                  <li><CalendarIcon /><span>Upcoming</span></li>
                </ul>
              </div>
              <div className="movie-quize">
                <h3>Play movie quizes and earn free tickets</h3>
                <p>50k people are playing now</p>
                <button className="rounded-button">Start playing</button>
              </div>
              <div className="detail-logout">
                <div className="button-logout" onClick={() => {
                  router.push('/');
                }}><OutIcon /> &nbsp;&nbsp;Log out</div>
              </div>
            </div>
            <div className="detail-content">
              <div className="video-content">
                <img src="/images/details/video.png" alt="video" width={"100%"} height={449} />
                <div className="play-button">
                  <div className="play-icon">
                    <img src="/images/details/Play.png" alt="play" />
                  </div>
                  <span>Watch Trailer</span>
                </div>
              </div>
              {movie && (
                <div className="movie-detail d-flex">
                  <div className="col-md-8 mr-4">
                    <div className="d-flex">
                      <div className="detail-movie-title">
                        <span data-testid="movie-title">{movie.title}</span> • 
                        <span data-testid="movie-release-date">{movie.release_date && movie.release_date}</span> • 
                        <span data-testid="movie-runtime">{movie.runtime}m</span>
                      </div>
                      <div className="movie-detail-tags">
                        {movie.genres && movie.genres.map((tag: any, index: number) => (
                          <MovieTag
                            tag={tag.name}
                            key={index}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-31">
                      <div className="movie-detail-description" data-testid="movie-overview">
                        {movie.overview && movie.overview}
                      </div>
                      <div className="d-flex gap-2">
                        <span className="property-title">Director :</span>
                        <span className="property-description">Joseph Kosinski</span>
                      </div>
                      <div className="d-flex gap-2">
                        <span className="property-title">Writers :</span>
                        <span className="property-description">Jim Cash, Jack Epps Jr, Peter Craig</span>
                      </div>
                      <div className="d-flex gap-2">
                        <span className="property-title">Stars :</span>
                        <span className="property-description">Tom Cruise, Jennifer Connelly, Miles Teller</span>
                      </div>
                      <div className="position-relative">
                        <select name="" id="" className="select-top">
                          <option value="1">Awards 9 nominations</option>
                        </select>
                        <div className="select-title">Top rated movie #65</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex mb-29 gap-2 justify-content-end align-items-center">
                      <img src="/images/details/Star.png" alt="star" width={30} height={30} />
                      <span className="star-score">{movie.vote_average && movie.vote_average.toFixed(1)}</span>
                      <span className="star-count">| {movie.vote_count && movie.vote_count > 1000 ? (movie.vote_count/1000).toFixed(1) + 'K': movie.vote_count}</span>
                    </div>
                    <div className="">
                      <button className="secondary-button mb-3">
                        <img src="/images/details/TwoTickets.png" alt="tickets" />&nbsp;&nbsp;See Showtimes
                      </button>
                      <button className="bordered-button"><ListIcon />&nbsp;&nbsp;More watch options</button>
                    </div>
                    <div className="movie-overview">
                      <img src="/images/details/Rectangle 37.png" className="bg-overview" alt="overview" width={"100%"} height={230} />
                      <div className="overview-content"><ListIcon />&nbsp;&nbsp;The Best Movies and Shows in September</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Movies;