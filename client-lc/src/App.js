import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Register from "./Register";
import Error from "./Error";
import { Profile, AllJobs, AddJobs, Stats, Dashboard } from "./dashboard";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Error />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Stats />}></Route>
            <Route path="add-jobs" element={<AddJobs />}></Route>
            <Route path="all-jobs" element={<AllJobs />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
