import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Song from "../../components/Song";
import {
  redirectToSpotify,
  getToken,
  getUserID,
  createPlaylist,
} from "../../authentication/Auth";
import TempSong from "../../components/TempSong";

export default function Main() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [songSelect, setSongSelect] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (
      window.localStorage.getItem("token") ||
      !window.localStorage.getItem("token")
    ) {
      setToken(getToken());
      getUserID(token).then((res) => {
				setUserInfo(res);
			})
    }
  }, []);

  const logoutSpotify = () => {
    setToken("");
    setTracks([]);
    window.localStorage.removeItem("token");
  };

  const searchTracks = async (e) => {
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
    setTracks(data.tracks.items);
  };

  const TemporarySong = Object.values(songSelect).map((track) => (
    <TempSong
      key={track.id}
      songTitle={track.name}
      songImg={track.album.images[0].url}
      artistName={track.artists}
    />
  ));

  const handleSongSelect = (track) => {
    if (!songSelect.includes(track)) {
      setSongSelect([...songSelect, track]);
      console.log([...songSelect, track]);
    } else {
      setSongSelect(songSelect.filter((elem) => elem !== track));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const playlistValue = {
      name: e.target.title.value,
      description: e.target.description.value,
    };

    const insertSong = songSelect.map((track) => track.uri);
    createPlaylist(userInfo.id, playlistValue, insertSong, token);

    setSongSelect([]);
  };

  return (
    <div>
      <div>
        <div className="btn top-btn centered">
          {!token ? (
            <button>
              <a href={redirectToSpotify()}>Login</a>
            </button>
          ) : null}
        </div>
        <div className="btn top-btn centered halved">
          {token ? (
            <form className="search" onSubmit={searchTracks}>
              <input
                type="text"
                placeholder="Keyword"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <button type={"submit"}>Search</button>
            </form>
          ) : null}
          {!token ? null : (
            <div className="btn top-btn btn-left">
              <button onClick={logoutSpotify}>Logout</button>
            </div>
          )}
        </div>
        <div className="btn top-btn centered halved">
          {token ? (
            <form className="search" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Playlist Title"
                id="title"
                required
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <br></br>
              <input
                type="textarea"
                id="description"
                required
                placeholder="Description"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <button type={"submit"}>Create Playlist</button>
            </form>
          ) : null}
        </div>
      </div>
      <div>
        {songSelect.length > 0 ? (
          <div className="preview-selected-tracks">{TemporarySong}</div>
        ) : null}
      </div>
      <div className="separator"></div>
      <div>
        <Song
          tracks={tracks}
          selectedSong={handleSongSelect}
          songSelect={songSelect}
        />
      </div>
    </div>
  );
}
