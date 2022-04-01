import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/CardSong/CardSong.css";

export default function CardS() {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "http://localhost:3000/";
  const client_id = "4209516021c744c6a1a6cab52bcb44ce";
  const scopes = ["playlist-modify-private"];

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [songSelect, setSongSelect] = useState([]);

  const redirectToSpotify = () => {
    const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;

    return loginUrl;
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logoutSpotify = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleSongSelect = (item) => {
    if (!songSelect.includes(item)) {
      setSongSelect([...songSelect, item]);
    } else {
      setSongSelect(songSelect.filter((elem) => elem !== item));
    }
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        q: searchKey,
        type: "track",
        limit: 12,
      },
    });
    console.log(data);
    setArtists(data.tracks.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div className="card" key={artist.id}>
        <div className="content">
          <div className="img-song">
            {artist.album.images.length ? (
              <img src={artist.album.images[0].url} alt="" />
            ) : (
              <div>No Image Available</div>
            )}
          </div>

          <div className="song-desc">
            <div className="title-song">
              <h2>{artist.name}</h2>
            </div>
            <div className="song-desc">
              <p>{artist.album.artists[0].name}</p>
            </div>
            <br></br>
            <div className="btn-card">
              {!songSelect.includes(artist.id) ? (
                <button id="submit" onClick={() => handleSongSelect(artist.id)}>
                  Select
                </button>
              ) : (
                <button className="btn-deselect" id="submit" onClick={() => handleSongSelect(artist.id)}>
                  Deselect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };
  console.log(artists);

  return (
    <div>
      <div className="btn top-btn">
        {token ? (
          <form className="search" onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
        ) : (
          <p></p>
        )}
        {!token ? (
          <button>
            <a href={redirectToSpotify()}>Login</a>
          </button>
        ) : (
          <div className="btn top-btn btn-left">
            <button onClick={logoutSpotify}>Logout</button>
          </div>
        )}
      </div>

      <div>
      {!token ? (
          <>
          </>
        ) : (
          <div>
            {renderArtists()}
          </div>
        )}
        </div>
    </div>
  );
}
