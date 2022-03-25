import logo from './logo.svg';
import './App.css';
import data from "./data.js";
import CardSong from './components/CardSong/CardSong';

function App() {
  return <
    CardSong data={data}
    />
}

export default App;
