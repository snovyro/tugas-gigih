import React from "react";
import { redirectToSpotify } from "../../authentication/Auth";

export default function SpotifyLogin() {
  return (
    <div className="btn top-btn centered">
      <button>
        <a href={redirectToSpotify()}>Login</a>
      </button>
    </div>
  );
}
