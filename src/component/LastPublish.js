
import Header from './EnduserHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MetaMaskSDK from '@metamask/sdk';
import './Header.css'
import Button from 'react-bootstrap/Button';

function LastPublish() {
  const [formData, setFormData] = useState({
    title: '',
    numAuthors: '',
    primaryAuthor: '',
    paperType: '',
    references: '',
    file: null
  });
  
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange1 = (event) => {
    setFormData({
      ...formData,
      file: event.target.files[0]
    });
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      file: event.target.files[0]
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  let options = {dappMetadata: {name: "TrustX", url: "http://localhost:3000"}};
  const MMSDK = new MetaMaskSDK(options);
  const [selectedFile, setSelectedFile] = useState();
  const [user, setUser] = useState();
  const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
  useEffect(() => {
    const checkLoggedIn = async() => {
      if(ethereum.isConnected()) {
        let ii = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
        setUser(ii);
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
    // const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
    let ii = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
    setUser(ii);
  };


  return (
    <div>
        <Header/>
  <div style={{marginTop:"150px" ,display:"flex",justifyContent:"center"}}>
    <form onSubmit={handleSubmit}>
        <div className='row' style={{marginTop:"20px"}}>
           
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange1}  style={{marginLeft:"153px"}}/>
      </label>
      </div>
      <div className='row'  style={{marginTop:"20px"}}>
      <label>
        Total number of authors:
        <input type="number" name="numAuthors" value={formData.numAuthors} onChange={handleChange1} />
      </label>
      </div>
      <div className='row '  style={{marginTop:"20px"}}>
      <label>
        Primary author:
        <input type="text" name="primaryAuthor" value={formData.primaryAuthor} onChange={handleChange1}  style={{marginLeft:"72px"}}/>
      </label>
      </div>
      <div className='row'  style={{marginTop:"20px"}}>
      <label>
        Type of paper:
        <select name="paperType" value={formData.paperType} onChange={handleChange1}  style={{marginTop:"20px",marginLeft:"87px"}}>
          <option value="research">Research</option>
          <option value="review">Review</option>
          <option value="case-study">Case Study</option>
        </select>
      </label>
      </div>
      <div className='row'  style={{marginTop:"20px"}}>
      <label>
        References:
        <textarea name="references" value={formData.references} onChange={handleChange1}  style={{marginLeft:"106px"}}></textarea>
      </label>
      </div>
      <div className='row'>
        <label className="form-label">Choose File</label>
      <input type="file"  onChange={changeHandler}/>
      <Button className='a' onClick={handleSubmission}>Submit</Button>
      </div>
    </form>
    </div>
    </div>
  );
}

export default LastPublish;
