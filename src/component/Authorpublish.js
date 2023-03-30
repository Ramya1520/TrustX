import Header from "./PublisherHeader";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./Header.css";
import "./LastPublish.css";
import Button from "react-bootstrap/Button";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import Tooltip from "@material-ui/core/Tooltip";
// import InfoIcon from "@material-ui/icons/Info";
// import IconButton from "@material-ui/core/IconButton";
import { array } from "yargs";
function LastPublish() {
  const [inputValues, setInputValues] = useState([null]);
  const user = useContext(UserContext).user;
  const rpc = useContext(UserContext).rpc;
  const [formErrors, setFormErrors] = useState({
    title: "",
    primaryAuthor: "",
    paperType: "",
  });
  const [selectedfileErrors, setSelectedFileErrors] = useState();
  const [formData, setFormData] = useState({
    title: "",
    primaryAuthor: "",
    paperType: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  // const [user, setUser] = useState();
  console.log(formData, "inputValues");
  console.log(formData, "inputValues");
  const handleAddFields = () => {
    const values = [...inputValues];
    values.push("");
    setInputValues(values);
  };
  const handleInputChange = (index, event) => {
    const values = [...inputValues];
    values[index] = event.target.value;
      setInputValues(values);
    
  };
  useEffect(() => {
    if (inputValues[0] !== null) {
      setFormData({ ...formData, primaryAuthor: inputValues });
    }
  }, [inputValues]);
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {}, []);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = async () => {
    let errors = {};
    if (selectedFile == undefined) {
      setSelectedFileErrors("ww");
    } else {
      setSelectedFileErrors();
    }
    if (
      formData.title &&
      formData.primaryAuthor &&
      formData.paperType 
    ) {
      const formData_post = new FormData();
      formData_post.append("file", selectedFile);
      console.log(selectedFile?.name, "name");
      const metadata = JSON.stringify({
        name: selectedFile?.name,
      });
      formData_post.append("pinataMetadata", metadata);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData_post.append("pinataOptions", options);
      try {
        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData_post,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData_post._boundary}`,
              Authorization: process.env.REACT_APP_JWT,
            },
          }
        );
        let authors = "[";
        formData.primaryAuthor.forEach(element => {
          authors += '"' + element + '"';
        });
        authors += "]";

        if (await rpc.submitPaper(formData.title, formData.paperType, res.data.IpfsHash, authors))
          console.log("submitted successfully");
        else
          console.log("failed");
      } catch (error) {
        console.log(error);
      }
    }
    Submit();
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
    if (!formData.primaryAuthor) {
      errors.primaryAuthor = "*Must be start with 0x";
      console.log(formData.primaryAuthor, "primaryauthor");
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // try {
    //   const response = await fetch("https://1b0b9541-6074-4786-9d00-98b5c74c99c4.mock.pstmn.io/abstracts", {
    //     method: 'POST',
    //     body: JSON.stringify(formData),
    //   })
    //   const data = await response.json();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div>
      <Header />
      <div className="container-fluid pg">
        <div className="row">
          <div className="col-lg-12 crd">
            <div class="login-page">
              <div class="form">
                <form class="login-form">
                  <form onSubmit={handleSubmit} className="author-form">
                    <div className="row">
                      <div
                        className="clo-sm-12"
                        style={{ display: "flex", columnGap: "20px" }}
                      >
                        <div className="clo-sm-6">
                          <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange1}
                          />
                          {formErrors.title && (
                            <p className="error show-error">
                              {formErrors.title}
                            </p>
                          )}
                        </div>
                        {/* <div className="clo-sm-6">
                          <select
                            name="Category"
                            className="research"
                            value={formData.category}
                            onChange={handleChange1}
                          >
                            <option value="research">Category</option>
                            <option value="Conference Paper">
                              Conference Paper
                            </option>
                            <option value="Journal Paper">Journal Paper</option>
                            <option value="magazine">Magazine</option>
                          </select>
                          {formErrors.category && (
                            <p className="error show-error">
                              {formErrors.category}
                            </p>
                          )}
                        </div> */}
                        <div className='clo-sm-6'>
                          <select name="paperType" className='research' value={formData.paperType} onChange={handleChange1} >
                            <option value="research">Category</option>
                            <option value="Conference Paper">Conference Paper</option>
                            <option value="Journal-paper">Journal paper</option>
                            <option value="Magazine">Magazine</option>
                          </select>
                          {formErrors.paperType && <p className="error show-error">{formErrors.paperType}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                          <input
                            type="file"
                            onChange={changeHandler}
                            className="choose"
                          />
                          {selectedfileErrors && (
                            <p className="error show-error ref-show">
                              {"*Required field"}
                            </p>
                          )}
                        </div>
                        </div>
                        <div className="row author-id" >
                        {inputValues.map((value, index) => (
                          <div key={index}>
                          <div className="col-sm-12" style={{display:"flex"}}>
                            <div key={index} className="col-sm-12" >
                              <input
                                placeholder="Author ID"
                                type="text"
                                value={value}
                                onChange={(event) =>
                                  handleInputChange(index, event)
                                }
                                style={{ paddingBottom: "20px" }}
                                className=""
                              />
                            </div>
                            <div className="col-sm-1">
                              {/* <Tooltip title="Must be start with 0x">
                                <IconButton>
                                  <InfoIcon style={{ color: "black" }} />
                                </IconButton>
                              </Tooltip> */}
                            </div>
                          </div>
                          {formErrors.primaryAuthor && (
                              <p className="error show-error ref-show authorid1">
                                {formErrors.primaryAuthor}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    {/* </div> */}
                    <div className="row">
                    <div className="col-sm-6">
                        <Button type="button" onClick={handleAddFields}>
                          Add Field
                        </Button>
                      </div>
                      <div className="col-sm-6">
                        <Button onClick={() => handleSubmission()}>
                          Submit
                        </Button>
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