import { useEffect, useState } from 'react';
import Publisherpage from './component/Publisherpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import Allpaper from './component/Allpaper';
import Authors from './component/Authors';
import Requests from './component/Requests';
import Enduserallpaper from './component/Enduserallpaper';
import React, { createContext } from 'react';
import Enduserauthor from './component/EnduserAuthor';
import LastPublish from './component/Authorpublish';

export let UserContext = createContext();

function App(){

  let [user, setUser] = useState();
  let [rpc, setRPC] = useState();

  // useEffect(() => {

  // }, []);
 
   return(
    <div className='index'>
         <UserContext.Provider value={{user, setUser, rpc, setRPC}}>
      <Routes>
        <Route path="/allpaper" element={<Allpaper />} />
        <Route path="" element={<Publisherpage />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/enduserallpaper" element={<Enduserallpaper />} />
        <Route path="/enduserauthor" element={<Enduserauthor />} />
        <Route path="/lastpublish" element={<LastPublish />} />
      </Routes>
      </UserContext.Provider>
    </div>
   )
}
export default App;