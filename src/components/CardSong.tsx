import "./CSS/Card.css";

export default function CardSong({ track, selectedSong, songSelect }) {

  let min = Number((track.duration_ms / 60000).toFixed(0));
	let sec = Number(((track.duration_ms % 60000) / 1000).toFixed(0));

  return (
    <div className="card" key={track.id}>
      <div className="content">
        <div className="img-song">
          {track.album.images.length ? (
            <img src={track.album.images[0].url} alt="" />
          ) : (
            <div>No Image Available</div>
          )}
        </div>

        <div className="song-desc">
          <div className="title-song">
            <h2>
              {track.name.length > 20
                ? `${track.name.substring(0, 20)}...`
                : track.name}
            </h2>
          </div>
          <div className="song-desc">
            <p>
              {track.album.artists[0].name.length > 35
                ? `${track.album.artists[0].name.substring(0, 35)}...`
                : track.album.artists[0].name}
            </p>
          </div>
          <div className="title-song">
            <br/>
            <p>
            {`${min}:${sec}`}
            </p>
          </div>
          <br></br>
          <div className="btn-card">
            <button
              className={songSelect ? "btn-deselect" : ""}
              onClick={() => selectedSong(track)}
            >
              {!songSelect ? "Select" : "Deselect"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
