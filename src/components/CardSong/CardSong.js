import React from 'react';
import "./CardSong.css";
import data from "../../data/data.js";

export default function CardSong() {
  const ListData = data.map((filterData) => (
    <div className="card" key={filterData.album.artists[0].id}>
      <div className="content">
        <div className="img-song">
          <img src={filterData.album.images[0].url} alt="" />
        </div>
        <div className="song-desc">
          <div className="title-song">
            <h2>{filterData.album.artists[0].name}</h2>
          </div>
          <div className="artist">
            <p>{filterData.album.name}</p>
          </div>
          <div className="btn-card">
            <button id="submit">Select</button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="main">
      {ListData}
    </div>
  )
}
