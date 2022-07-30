import React, { ReactNode, useEffect, useState } from "react";
import './pageFadeIn.scss';
import loading from '../assets/gif/loading.gif'

const fadeIn = "opacity .3s";

const PageFadeIn = ({
  children,
  waitFor,
}: {
  children: ReactNode;
  waitFor: any[];
}) => {


  const allReady = waitFor.every((o) => o !== undefined && o !== null);

  return (
    <div className="loading-container">
    <div
    className="fade-in"
      style={{
        opacity: allReady ? 1 : 0,
        transition: fadeIn,
        width: "100%",
      }}
    >

      {children}

      </div>
      { !allReady && <div className="loading">
      <img src={loading} alt="loading..." />
      </div> }
    </div>
  );
};

export default PageFadeIn;
