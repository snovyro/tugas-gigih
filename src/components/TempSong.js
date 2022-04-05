import React from "react";
import "./Card.css";

export default function TempSong({ songImg, imgAlt, songTitle, artistName }) {
  return (
    <div className="card-max">
      <div className="content">
        <div className="img-song">
          <img src={songImg} alt={imgAlt} />
        </div>
        <div className="song-desc">
          <div className="title-song">
            <h2>{songTitle}</h2>
          </div>
          <div className="song-desc">
            <p>{artistName.map((artist) => artist.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
