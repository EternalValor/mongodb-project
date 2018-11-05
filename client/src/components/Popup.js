import React from 'react';
import '../css/Popup.css';

const popup = (props) => {
  const popupClass = props.shown ? props.popupRed ? "popup popup--red" : "popup" : "popup popup--hidden";
  return (
    <div className={popupClass}>
      {props.message}
    </div>
  );
}

export default popup;