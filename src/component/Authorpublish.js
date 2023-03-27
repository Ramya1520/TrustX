import Header from './EnduserHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MetaMaskSDK from '@metamask/sdk';
import './Header.css'
import './LastPublish.css'
import Button from 'react-bootstrap/Button';
function LastPublish() {
  const [inputValues, setInputValues] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    numAuthors: '',
    primaryAuthor: inputValues,
    paperType: '',
    references: '',
  });
  let options = { dappMetadata: { name: "TrustX", url: "http://localhost:3000" } };
  const MMSDK = new MetaMaskSDK(options);
  const [selectedFile, setSelectedFile] = useState();
  const [user, setUser] = useState();
  const ethereum = MMSDK.getProvider();
  console.log(inputValues, "inputValues")
  const handleInputChange = (index, event) => {
    const values = [...inputValues];
    values[index] = event.target.value;
    setInputValues(values);
  };
  const handleAddFields = () => {
    const values = [...inputValues];
    values.push('');
    setInputValues(values);
  };
  useEffect(() => {
    setFormData({ ...formData, primaryAuthor: inputValues });
    console.log(formData)
  }, [inputValues])

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

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
    Submit()
  };
  const Submit = async (id) => {
    try {
      const response = await fetch("https://1b0b9541-6074-4786-9d00-98b5c74c99c4.mock.pstmn.io/abstracts", {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header />
      <div className='container-fluid pg'>
        <div className='row'>
          <div className='col-lg-12 crd'>
            <div class="login-page">
              <div class="form">
                <form class="login-form">
                  <form onSubmit={handleSubmit} className="author-form">
                    <div className='row'>
                      <div className='clo-sm-12' style={{ display: "flex", columnGap: "20px" }}>
                        <div className='clo-sm-6'>
                          <input type="text" placeholder='Title' name="title" value={formData.title} onChange={handleChange1} />
                        </div>
                        <div className='clo-sm-6'>
                          <select name="paperType" className='research' value={formData.paperType} onChange={handleChange1} >
                            <option value="research">Research</option>
                            <option value="review">Review</option>
                            <option value="case-study">Case Study</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <textarea name="references" className='slt' placeholder='References' value={formData.references} onChange={handleChange1}></textarea>
                    <div className='row'>
                    <div className='col-sm-6'>
                    <input type="file" onChange={changeHandler} className="choose" />
                    </div>
                   
                      {inputValues.map((value, index) => (
                        <div className='col-sm-6'>
                          <input
                            placeholder='Author'
                            type="text"
                            value={value}
                            onChange={(event) => handleInputChange(index, event)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className='row'>
                    <div className='col-sm-6'>
                    <Button type="button" onClick={handleAddFields}>
                      Add Field
                    </Button>
                    </div>
                    <div className='col-sm-6'>
                    <Button onClick={handleSubmission}>Submit</Button>
                    </div>
                    </div>
                  </form>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LastPublish;





