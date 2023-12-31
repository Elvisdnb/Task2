import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Common/Header'
import Slider from '../components/Slider'
import Title from '../components/Title'
import MovieCard, { MovieCardType } from '../components/MovieCard'
import { FEATURED_MOVIES, MOVIES } from '../data'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../components/Common/Icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home: NextPage = () => {
  const [movies, setMovies] = useState<MovieCardType[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<MovieCardType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let tmpMovies = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=27a4af714a325a89bbec17754ad3a8ef')
        let arrMovies: MovieCardType[] = [];
        if(tmpMovies.data.results) {
          const subMovies = tmpMovies.data.results.slice(0, 10);
          for(let i = 0; i < subMovies.length; i ++) {
            let images = await axios.get('https://api.themoviedb.org/3/movie/'+subMovies[i].id+'/images?api_key=27a4af714a325a89bbec17754ad3a8ef');
            console.log(images);
            arrMovies = [...arrMovies, {
              id: subMovies[i].id,
              title: subMovies[i].original_title,
              img: subMovies[i].backdrop_path,
              description: subMovies[i].overview,
              rank: subMovies[i].vote_average * 10 + '',
              percent: subMovies[i].popularity,
              tags: subMovies[i].genre_ids,
            }];
          }
          setMovies(arrMovies);
        }

        let tmpGenres = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=27a4af714a325a89bbec17754ad3a8ef');
        const copiedGenres: any = {};
        for(let genre of tmpGenres.data.genres) {
          copiedGenres[genre.id] = genre.name;
        }
        setGenres(copiedGenres);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchMovies();
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue]);

  useEffect(() => {
    const fetchMovies = async () => {

      let tmpMovies = await axios.get('https://api.themoviedb.org/3/search/movie?query='+debouncedValue+'&include_adult=false&language=en-US&page=1&api_key=27a4af714a325a89bbec17754ad3a8ef')
      let arrMovies: MovieCardType[] = [];
      if(tmpMovies.data.results) {
        const subMovies = tmpMovies.data.results.slice(0, 10);
        for(let i = 0; i < subMovies.length; i ++) {
          arrMovies = [...arrMovies, {
            id: subMovies[i].id,
            title: subMovies[i].original_title,
            img: subMovies[i].backdrop_path,
            description: subMovies[i].overview,
            rank: subMovies[i].vote_average * 10 + '',
            percent: subMovies[i].popularity,
            tags: subMovies[i].genre_ids,
          }];
        }
        setSearchedMovies(arrMovies);
      }
    }
    if(debouncedValue == "") {
      setSearchedMovies(movies);
    } else {
      fetchMovies();
    }
  }, [movies, debouncedValue])

  return (
    <div>
      <Head>
        <title>Moviebox</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='container-fluid mb-71 p-0'>
          {/* Slider */}
          <div className='row position-relative'>  
            <Slider />
            <Header search={searchValue} setSearch={setSearchValue}/>
          </div>

          {/* Feature Movie */}
          <div className='mt-70 layout-mx-p mb-103'>
            {/* <Title />
            <div className='row'>
              {FEATURED_MOVIES.map((movie, index) => (
                <div key={index} className='col-md-3 col-sm-4 col-xs-6 d-flex justify-content-center'>
                  <MovieCard
                    id={movie.id}
                    img={movie.img}
                    category={movie.category} 
                    description={movie.description}
                    rank={movie.rank}
                    percent={movie.percent}
                    title={movie.title}
                    tags={movie.tags}
                  />
                </div>
              ))}
            </div> */}

            <div className='row'>
              {searchedMovies.map((movie, index) => (
                <div key={index} className='col-md-3 col-sm-4 col-xs-6 d-flex justify-content-center'>
                  <MovieCard
                    id={movie.id}
                    img={movie.img}
                    category={movie.category} 
                    description={movie.description}
                    rank={movie.rank}
                    percent={movie.percent}
                    title={movie.title}
                    tags={movie.tags}
                    genres={genres}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='social-links'>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
              <YoutubeIcon />
            </div>
            <div className='d-flex justify-content-center footer-menu'>
              <span>Conditions of Use</span>
              <span>Privacy & Policy</span>
              <span>Press Room</span>
            </div>
            <div className='d-flex justify-content-center footer-notice'>© 2021 MovieBox by Adriana Eka Prayudha  </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
