import React from "react";
import CardSong from "./CardSong";

export default function Song({ tracks, selectedSong, songSelect }) {
  const renderTracks = () => {
    return tracks.map((track) => {
      return (
        <CardSong
          key={track.id}
          track={track}
          selectedSong={selectedSong}
          songSelect={songSelect.find(
            (songSelect) => songSelect.id === track.id
          )}
        />
      );
    });
  };
  return <div>{renderTracks()}</div>;
}
