import React from "react";

const CompanyInfo = (props: {
  rank: string;
  percent: string;
}) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <img src="/images/landing/imdb.png" alt="IMDB" />
        <span className="mark-movie-title">{props.rank} / 100</span>
      </div>
      <div className="d-flex align-items-center">
        <img src="/images/landing/PngItem_1381056 1.png" alt="st" />
        <span className="mark-movie-title">{props.percent}%</span>
      </div>
    </div>
  );
}

export default CompanyInfo;