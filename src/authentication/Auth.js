const redirectToSpotify = () => {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "http://localhost:3000/";
  const client_id = "4209516021c744c6a1a6cab52bcb44ce";
  const scopes = ["playlist-modify-private"];

  const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return loginUrl;  
};

const getToken = () => {
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
  return token;
};

export {redirectToSpotify , getToken}