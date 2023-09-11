import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserProvider from "./auth/AuthProvider";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
