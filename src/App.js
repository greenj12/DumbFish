import './App.css';
import './ui/slider.scss';
import GameScreen from './ui/GameScreen';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          DumbFish
        </h1>
        <p>
          A terrible chess AI
        </p>
      </header>
      <GameScreen />
    </div>
  );
}

export default App;
