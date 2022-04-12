import React, { useEffect, useMemo, useState } from "react";
import Main from "../pages/main/main";
import SpotifyLogin from "../pages/login/login";
import ContextToken from "../context/ContextToken";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";  
import { getToken } from "../authentication/Auth";

export default function AuthRouter() {
  const [token, setToken] = useState("");
  const value = useMemo(() => ({ token, setToken }), [token]);

  useEffect(() => {
    if (!token) {
      setToken(getToken());
    }
  }, [token]);

  return (
    <ContextToken.Provider value={value}>
      <Router>
        <Switch>
          <Route path="/create-playlist">
            {!token ? (
              <Redirect exact from="/create-playlist" to="/" />
            ) : (
              <Main />
            )}
          </Route>
          <Route path="/">
            {token ? (
              <Redirect exact from="/" to="/create-playlist" />
            ) : (
              <SpotifyLogin />
            )}
          </Route>
        </Switch>
      </Router>
    </ContextToken.Provider>
  );
}
