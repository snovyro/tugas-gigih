import React from 'react';
import "./CardSong.css";

export default function CardSong(props) {
  return (
    <div className="card">
          <div className="content">
            <div className="img-song">
                <img src={props.data.album.images[0].url} alt="" />
            </div>
            <div className="song-desc">
              <div className="title-song">
              <h2>{props.data.name}</h2>
              </div>
              <div className="artist">
                <p>{props.data.artists[0].name}</p>
              </div>
              <div className="btn-card">
                <button id="submit">Select</button>
              </div>
            </div>
          </div>
        </div>
  )
}
