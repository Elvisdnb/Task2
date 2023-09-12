import React from "react";

export type MovieTagType = {
  tag: string;
}

const MovieTag = (props: MovieTagType) => {
  return (
    <div className="movie-tag">{props.tag}</div>
  );
}

export default MovieTag;