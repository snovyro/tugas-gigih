import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Song from "../../components/Song";
import { getUserID, createPlaylist } from "../../authentication/Auth";
import { getToken } from "../../authentication/GetToken.jsx";
import TempSong from "../../components/TempSong";
import ContextToken from "../../context/ContextToken";
import Navbar from "../../components/Navbar";
import "../../components/CSS/Main.css";

export default function Main() {
  const { token, setToken } = useContext(ContextToken);
  // const [token, setToken] = useState("");
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
      });
    }
  }, [setToken, token]);

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
      <Navbar />
      <div className="row">
        <div className="content-main ">
          <form className="input-group" onSubmit={searchTracks}>
            <input
              className="form-control"
              type="text"
              placeholder="Keyword"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button name="search" className="btn btn-light" type={"submit"}>
              Search
            </button>
          </form>
          <Song
            tracks={tracks}
            selectedSong={handleSongSelect}
            songSelect={songSelect}
          />
        </div>
        <div className="side-content">
          <div className="playlist-card">
            <form className="addplaylist" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Playlist Title"
                id="title"
                minLength="10"
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
          </div>
          <div>
            {songSelect.length > 0 ? (
              <div className="preview-selected-tracks">{TemporarySong}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
