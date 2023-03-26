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
import Enduserallpaper from './component/Enduserallpaper';
import React, { createContext, useContext } from 'react';
export const UserContext = createContext(null);
function App(){

  let options = {dappMetadata: {name: "TrustX", url: "http://localhost:3000"}};
  const MMSDK = new MetaMaskSDK(options);
  const [selectedFile, setSelectedFile] = useState();
  const [user, setUser] = useState();
  const ethereum = MMSDK.getProvider();
  useEffect(() => {
    const checkLoggedIn = async() => {
      if(ethereum.selectedAddress) {
        console.log(ethereum.selectedAddress,"true")
        let ii = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
        setUser(ii);
      }
      else{
        console.log(ethereum.selectedAddress,"fal")
      }
    };
    checkLoggedIn();
  },[ethereum]);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = async() => {
    const formData = new FormData();
    formData.append('file', selectedFile)
    const metadata = JSON.stringify({
      name: selectedFile.name,
    });
    formData.append('pinataMetadata', metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: process.env.REACT_APP_JWT
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async() => {
    let ii = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
    setUser(ii);
  };
 
   return(
    <div className='index'>
         <UserContext.Provider value={user}>
      <Routes>
        <Route path="/allpaper" element={<Allpaper />} />
        <Route path="" element={<Publisherpage />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/Enduserallpaper" element={<Enduserallpaper />} />
      </Routes>
      </UserContext.Provider>
    </div>
   )
}
export default App;