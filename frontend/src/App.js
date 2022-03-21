import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm/LoginForm";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/a" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
