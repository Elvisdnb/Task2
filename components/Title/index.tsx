import React from "react";
import { LeftArrowIcon } from "../Common/Icons";

const Title = () => {
  return (
    <div className='d-flex justify-content-between featured-movie'>
      <span className='featured-movie-title'>Featured Movie</span>
      <span className='featured-movie-more'>See more <LeftArrowIcon /> </span>
    </div>
  );
}

export default Title;