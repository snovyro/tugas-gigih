import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/CardSong/CardSong.css";

export default function Autho() {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "http://localhost:3000";
  const client_id = "4209516021c744c6a1a6cab52bcb44ce";
  const scopes = ["playlist-modify-private"];

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

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
      token = hash.substring(1).split("&").find((elem) => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);


  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div className="card" key={artist.id}>
        <div className="content">
          <div className="img-song">
            {artist.images.length ? (
              <img src={artist.images[0].url} alt="" />
            ) : (
              <div>No Image</div>
            )}
          </div>

          <div className="song-desc">
            <div className="title-song">
              <h2>{artist.name}</h2>
            </div>
            <div className="btn-card">
              <button id="submit">Select</button>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  console.log(artists);

  return (
    <div>
    <div className="title">
    <h1>Login</h1>
    </div>
      
        <form className="search" onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>
        <div className="btn top-btn">
       <button><a href={redirectToSpotify()}>Login</a></button>
       </div>
      <div>
        {renderArtists()}
      </div>
    </div>
  );
}
