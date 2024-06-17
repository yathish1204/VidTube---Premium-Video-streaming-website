import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import { useState } from 'react';

function App() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
     <Navbar setSidebar={setSidebar}/>
     <Routes>
      <Route exact path='/' element={<Home sidebar={sidebar} />}/>
      <Route exact path='/video/:categoryId/:videoId' element={<Video/>}/>
     </Routes>
    </div>
  );
}

export default App;
