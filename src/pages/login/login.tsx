import { redirectToSpotify } from "../../authentication/Auth";
import "../../components/CSS/LoginCSS.css";

export default function SpotifyLogin() {
  return (
    <div className="center-content max-height">
      <p>click </p>
      <a className="nodeco white-color login" href={redirectToSpotify()}>HERE</a>
      <p> to login.</p>
    </div>
  );
}
