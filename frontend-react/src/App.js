import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import UserCrud from "./components/UserCrud";

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<UserCrud />} />
        {/* <Route path="/add" element={<AddUser />} /> */}
    </Routes>
</Router>
  );
}

export default App;
