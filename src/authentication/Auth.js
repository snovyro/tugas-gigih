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

const getUserID = async (token) => {
	const response = await fetch("https://api.spotify.com/v1/me/", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
			"Content-Type": "application/json",
		},
	});
	const userData = await response.json();
	return userData;
};

const createPlaylist = async (
	userId,
	{ name, description },
	insertSong,
	token
) => {
	const response = await fetch(
		`https://api.spotify.com/v1/users/${userId}/playlists`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				description: description,
				public: false,
			}),
		}
	);
	const playlist = await response.json();
	insertSongPlaylist(playlist.id, insertSong, token);
};

const insertSongPlaylist = async (id, tracks, token) => {
	const response = await fetch(
		`https://api.spotify.com/v1/playlists/${id}/tracks`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uris: tracks,
			}),
		}
	);
};

export {redirectToSpotify , getToken , getUserID , createPlaylist , insertSongPlaylist}