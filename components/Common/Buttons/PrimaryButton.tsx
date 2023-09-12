import React from "react";

export interface PrimaryButtonProps {
  caption: string;
  icon?: any;
  bordered?: boolean;
  onClick: any;
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <button className={`primary-button`} onClick={props.onClick}>
      {props.icon ? props.icon : ""}
      <span>{props.caption}</span>
    </button>
  );
}
