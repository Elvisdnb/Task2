import React from "react";
import { PrimaryButton } from "../Common/Buttons";
import { PlayIcon } from "../Common/Icons";
import CompanyInfo from "../CompanyInfo";

const Slider = () => {
  return (
    <div className="positioin-abosolute top-0">
      <div className='bg-landing w-100 h-600 position-relative'>
        <div className="position-absolute slider-content layout-mx d-flex flex-column gap-4">
          <h2 className="slider-title">John Wick 3: Parabellum</h2>
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <img src="/images/landing/imdb.png" alt="IMDB" />
              <span className="mark-title">86.0 / 100</span>
            </div>
            <div className="d-flex align-items-center pl-34">
              <img src="/images/landing/PngItem_1381056 1.png" alt="st" />
              <span className="mark-title">97%</span>
            </div>
          </div>
          <p className="slider-description">
            John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
          </p>
          <div>
            <PrimaryButton
              caption="WATCH TRAILER"
              icon={<PlayIcon />}
              onClick={() => {}} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;