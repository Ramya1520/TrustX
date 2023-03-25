import axios from 'axios';
import { useEffect, useState } from 'react';
import MetaMaskSDK from '@metamask/sdk';
import Publisherpage from './component/Publisherpage';
import Login from './component/Login';
import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import Allpaper from './component/Allpaper';
import Authors from './component/Authors';
import Requests from './component/Requests';
function App(){
   return(
    <div className='index'>
      <Routes>
        <Route path="/allpaper" element={<Allpaper />} />
        <Route path="" element={<Publisherpage />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </div>
   )
}
export default App;