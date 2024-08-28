import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Main />} />
          <Route
            path="*"
            element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
