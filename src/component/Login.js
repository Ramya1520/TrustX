import axios from 'axios';
import { useEffect, useState } from 'react';
import MetaMaskSDK from '@metamask/sdk';
import { Button } from 'react-bootstrap';
import metamask from './assets/meta.png';
import './Login.css'

function Login(){
    let options = {dappMetadata: {name: "TrustX", url: "http://localhost:3000"}};
    const MMSDK = new MetaMaskSDK(options);
    const [selectedFile, setSelectedFile] = useState();
    const [user, setUser] = useState();
    const ethereum = MMSDK.getProvider();
    useEffect(() => {
      const checkLoggedIn = async() => {
        if(ethereum.selectedAddress) {
    
          let ii = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
          setUser(ii);
        }
        else{
         
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
    <div className="App">
    <div>
      {
        (user===undefined &&
        <Button onClick={handleLogin}> Login</Button>)
        || ((user!==undefined) &&
        <img src={metamask} alt="metamask" className='metaimg'/>)
      }
    </div>
  </div>
)
}
export default Login;