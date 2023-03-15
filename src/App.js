import { BrowserRouter, Routes, Switch, Route } from 'react-router-dom';
import { accessToken  } from './spotify';
import Playlists from './pages/Playlists';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import SinglePlaylist from './pages/SinglePlaylist';
import Navbar from './components/Navbar';
import Wallpaper from './pages/Wallpaper';
import CustomWallpaper from './pages/CustomWallpaper';
import Payment from './pages/Payment';

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(accessToken)
  })
  return (
    <BrowserRouter>
      <div className="bg-black  text-white">
        <Navbar /> 
        <Routes>
          <Route path='/playlists' element={<Playlists />} />
          <Route path='/playlists/:id' element={<SinglePlaylist />} />
          <Route path='/customwallpaper' element={<CustomWallpaper />} />
          <Route path='/payment' element={<Payment />} />
          {/* <Route path='/wallpaper' element={<Wallpaper />} /> */}
          <Route path='/' element={<Login />} />
        </Routes>
     
    </div>
    </BrowserRouter>
    
  );
}

export default App;
