import React from "react";
import CompanyInfo from "../CompanyInfo";
import { InterestIcon } from "../Common/Icons";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export type MovieCardType = {
  id: number;
  img: string;
  category?: string;
  description: string;
  rank: string;
  percent: string;
  title: string;
  tags: string[];
  genres?: any;
}

const MovieCard = (props: MovieCardType ) => {
  const router = useRouter();
  return (
    <div
      data-testid="movie-card"
      className="movie-card d-flex flex-column gap-3 position-relative" 
      onClick={() => {
        router.push('/movies/' + props.id);
      }}
    >
      <img data-testid="movie-poster" src={'https://image.tmdb.org/t/p/w220_and_h330_face' + props.img} alt="thumbnail" width={250} height={370}/>
      {props.category && (
        <div className="movie-category">{props.category}</div>
      )}
      <div 
        className="movie-interest" 
        onClick={(event) => {
          toast.success('Linked!');
          event.stopPropagation();
        }}
      >
        <InterestIcon />
      </div>
      <div className="movie-info">{props.description}</div>
      <div data-testid="movie-title" className="movie-title">{props.title}</div>
      <div className="w-100">
        <CompanyInfo 
          rank={parseFloat(props.rank).toFixed(1)}
          percent={parseFloat(props.percent).toFixed(1)}
        />
      </div>
      <div className="movie-info">{props.tags.map(tag => {return props.genres[tag] + ', '})}</div>
    </div>
  );
}

export default MovieCard;
