
import "./CSS/TempSong.css";

export default function TempSong({ songImg, imgAlt, songTitle, artistName }) {
  return (
    <div className="card-max">
        <div className="temp-song">
          <img src={songImg} alt={imgAlt} />
        </div>
        <div className="temp-song-desc">
          <div>
            <p>{songTitle}</p>
            <p>
              {artistName.map((artist) => artist.name).join(", ").length > 40
                ? `${artistName.map((artist) => artist.name).join(", ").substring(0, 40)}...`
                : artistName.map((artist) => artist.name).join(", ")}
            </p>
          </div>
      </div>
    </div>
  );
}
