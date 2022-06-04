import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import LatestEvents from './Components/LatestEvents/LatestEvents';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='latestEvents' element={<LatestEvents></LatestEvents>}></Route>
      </Routes>
    </div>
  );
}

export default App;
