
import Header from './EnduserHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MetaMaskSDK from '@metamask/sdk';
import './Header.css'
import './LastPublish.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  let options = { dappMetadata: { name: "TrustX", url: "http://localhost:3000" } };
  const MMSDK = new MetaMaskSDK(options);
  const [selectedFile, setSelectedFile] = useState();
  const [user, setUser] = useState();
  const ethereum = MMSDK.getProvider();
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (ethereum.isConnected()) {
        let ii = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
        setUser(ii);
      }
    };
    checkLoggedIn();
  }, [ethereum]);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = async () => {
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



  return (
    <div>
      <Header />
        <Card className='author-card'>
          <Card.Body>
              <form onSubmit={handleSubmit} className="author-form">
                <input type="text" placeholder='Title' name="title" value={formData.title} onChange={handleChange1} />
                <input type="number" placeholder='   Total number of authors' name="numAuthors" value={formData.numAuthors} />
                <input type="text" placeholder='  Primary author' name="primaryAuthor" value={formData.primaryAuthor} onChange={handleChange1} />
                <select name="paperType" placeholder="Type of paper" value={formData.paperType} onChange={handleChange1}>
                  <option value="research">Research</option>
                  <option value="review">Review</option>
                  <option value="case-study">Case Study</option>
                </select>
                <textarea name="references" placeholder='References' value={formData.references} onChange={handleChange1}></textarea>
                  <input type="file" onChange={changeHandler} />
                  <Button onClick={handleSubmission}>Submit</Button>
              </form>
          </Card.Body>
        </Card>
      </div>
  );
}

export default LastPublish;
