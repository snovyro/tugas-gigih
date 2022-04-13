import * as React from "react";
import Stack from "@mui/material/Stack";
import { Button } from '@mui/material';
import { redirectToSpotify } from "../../authentication/Auth";
import "../../components/Card.css"

export default function SpotifyLogin() {
  return (
    <div  className="centered logincenter">
      <Stack spacing={2} direction="row">
        <Button variant="contained">
          <a className="nodeco white-color" href={redirectToSpotify()}>Login</a>
        </Button>
      </Stack>
    </div>
  );
}
