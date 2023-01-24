import './App.css';
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Dogs from './Dogs';
import Locations from './Locations';
import Meetups from './Meetups';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dogs" element={<Dogs/>} />
          <Route path="/locations" element={<Locations/>} />
          <Route path="/meetups" element={<Meetups/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
  );
}

export default App;
