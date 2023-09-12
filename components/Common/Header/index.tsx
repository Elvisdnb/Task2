import React from "react";
import Logo from "./Logo";
import { SearchIcon, SettingIcon } from "../Icons";

const Header = (props: any) => {
  return (
    <div className='position-absolute top-0 left-0 right-0 layout-px py-4 d-flex justify-content-between'>
      <div className="d-flex logo align-items-center">
        <Logo />
        <h1 className="logo-title">MovieBox</h1>
      </div>
      <div className="search-content position-relative">
        <input 
          type="text" 
          placeholder="What do you want to watch?" 
          value={props.search} 
          onChange={(e) => {
            props.setSearch(e.target.value);
          }}
          className="search-input"
        />
        <div className="position-absolute search-icon">
          <SearchIcon />
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="signin-title">Sign in</div>
        <div className="setting d-flex align-items-center justify-content-center">
          <SettingIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;