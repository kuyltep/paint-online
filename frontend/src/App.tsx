import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import SettingsBar from "./components/SettginsBar/SettingsBar";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  return (
    <div className="app">
      <Toolbar />
      <SettingsBar />
      <Canvas />
    </div>
  );
}

export default App;
