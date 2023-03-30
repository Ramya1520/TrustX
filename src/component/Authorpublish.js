import Header from './EnduserHeader';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import './Header.css'
import './LastPublish.css'
import Button from 'react-bootstrap/Button';
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function LastPublish() {
  const [inputValues, setInputValues] = useState([null]);
  const user = useContext(UserContext).user;
  const provider=useContext(UserContext).provider;
  const [formErrors,setFormErrors]=useState()
  const [selectedfileErrors,setSelectedFileErrors]=useState()
  const [formData, setFormData] = useState({
    title: '',
    numAuthors: '',
    primaryAuthor: '',
    paperType: '',
    references: '',
  });
  
  const [selectedFile, setSelectedFile] = useState();
  // const [user, setUser] = useState();
  console.log(inputValues, "inputValues")
  
  const handleAddFields = () => {
    const values = [...inputValues];
    values.push('');
    setInputValues(values);
  };
  
  const handleInputChange = (index, event) => {
    const values = [...inputValues];
    const pattern = /^0x[a-fA-F0-9]*$/; 
    values[index] = event.target.value;
    if (pattern.test(values)) {
      setInputValues(values);
    }
  
  };
  useEffect(() => {
    if(inputValues[0] !== null){

     setFormData({ ...formData, primaryAuthor: inputValues });
    }
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

  };

  useEffect(() => {
    
  }, []);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = async () => {
    let errors = {};
    if (selectedFile==undefined) {
      setSelectedFileErrors("ww")
    }   
    else{
      setSelectedFileErrors()
    }
   
    const formData = new FormData();
    formData.append('file', selectedFile)
    console.log(selectedFile?.name,"name")
    const metadata = JSON.stringify({
      name: selectedFile?.name,
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
    let errors = {};
    if (!formData.title) {
      errors.title = "*Required field";
  }
  if (!formData.primaryAuthor) {
      errors.primaryAuthor = "*Required field";
  }

  if (!formData.paperType) {
      errors.paperType = "*Required field";
  }
  if (!formData.references) {
      errors.references = "*Required field";
  }
  if (!formData.primaryAuthor) {
    errors.primaryAuthor = "*must be start with 0x";
    console.log(formData.primaryAuthor,"primaryauthor")
}

  if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
  }

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
                          {formErrors.title && <p className="error show-error" >{formErrors.title}</p>}
                        </div>
                        <div className='clo-sm-6'>
                          <select name="paperType" className='research' value={formData.paperType} onChange={handleChange1} >
                            <option value="research">Research</option>
                            <option value="review">Review</option>
                            <option value="case-study">Case Study</option>
                          </select>
                          {formErrors.paperType && <p className="error show-error">{formErrors.paperType}</p>}
                        </div>
                      </div>
                    </div>
                    <textarea name="references" className='slt' placeholder='References' value={formData.references} onChange={handleChange1}></textarea>
                    {formErrors.references && <p className="error show-error">{formErrors.references}</p>}
                    <div className='row'>
                    <div className='col-sm-6'>
                    <input type="file" onChange={changeHandler} className="choose" />
                    {selectedfileErrors&& <p className="error show-error ref-show">{"*Required field"}</p>}
                    </div>

                      {inputValues.map((value, index) => (
                          <div key={index}>
                        <div className='col-sm-6'>
                          <input
                            placeholder='Author ID'
                            type="text"
                            value={value}
                            onChange={(event) => handleInputChange(index, event)}
                            style={{paddingBottom:"20px"}}
                          />
                         {formErrors.primaryAuthor && <p className="error show-error ref-show">{formErrors.primaryAuthor}</p>}
                        </div>
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
                    <Button onClick={()=>(handleSubmission())}>Submit</Button>
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





