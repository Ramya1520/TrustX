import { useEffect, useState } from 'react';
import Header from './Header'
import Card from 'react-bootstrap/Card';
import './PublisherPage.css'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { UserContext } from "../App.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function Publisherpage() {
  const [publisherpage, setPublisherpage] = useState()
  const [filterdata, setFilterdata] = useState();
  const [viewreview, setViewreview] = useState()
  const [abstract, setAbstract] = useState()
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const user = useContext(UserContext).user;
  const rpc = useContext(UserContext).rpc;
  const [defaultContent, setDefaultContent] = useState("Please Login");

  useEffect(() => {
    const init = async () => {
      if (user) {
        var papers = await rpc.getPublisherHome(user, false);
        console.log("=== ", papers);
        if (papers.length == 1 && papers[0][0].id == 0) {
          setDefaultContent("Empty array returned");
          return;
        }
        let data = [];
        papers.forEach(element => {
          data.push(element[0]);
        });
        setPublisherpage(data);
        setFilterdata(data);
      }
    };
    init();
  }, [user])

  // const Details = () => {
  //   fetch("https://b1db9323-a6f5-4c92-b089-17457f1cbb07.mock.pstmn.io/publisherpublish", {
  //     method: 'GET',
  //   }
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       setPublisherpage(data)
  //       setFilterdata(data)
  //     })
  //     .catch(err => console.log(err));
  // }

  // const View_Review = async (id) => {
  //   try {
  //     const response = await fetch("https://f98375b8-2beb-4b97-8f4d-863c96e09021.mock.pstmn.io/review", {
  //       method: 'POST',
  //       body: JSON.stringify({ "id": id }),
  //     })
  //     const data = await response.json();
  //     setViewreview(data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  //   handleShow()
  // }

  // const See_Abstract = async (id) => {
  //   try {
  //     const response = await fetch("https://1b0b9541-6074-4786-9d00-98b5c74c99c4.mock.pstmn.io/abstracts", {
  //       method: 'POST',
  //       body: JSON.stringify({ "id": id }),
  //     })
  //     const data = await response.json();
  //     setAbstract(data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  //   handleShow1();
  // }
  const downloadPaper = async (url,filename) => {
    return new Promise((res, rej) => {
      fetch(url)
        .then((resp) => resp.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          filename=filename.replace(" ","_");
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => console.log("not able to download"));
    });
  };

  const Publish = async (id) => {
    try {
      if (user) {
        var status = await rpc.publishPaper(id);
        if (status) {
          console.log(status);
          toast.success("Paper published!", {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          toast.error("You are not a publisher!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const filterNames = e => {
    const search = e.target.value.toLowerCase()
    const filteredtitle = filterdata.filter(searchbar => searchbar.title.toLowerCase().includes(search))
    setPublisherpage(filteredtitle)
  }

  return (
    <div>
      <Header />
      <ToastContainer />
      {publisherpage ? <div>
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1, backgroundColor: "white" }}>
          <input type="type" className='form-control  searchbar' onChange={(e) => filterNames(e)} placeholder="Search Title" />
        </div>
        <div className='crd-1'>
          <div className='card-space'>
            {
              publisherpage?.map((element, index) => (
                <div key={index}>
                <div className='card-div'>
                  <Card style={{ width: '90vw' }}>
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      
                      {element.authors.map((element,index)=>(
                        <div key={index}>
                        <p style={{marginBottom:"2px"}}>
                        Author Id :{element}</p>
                        </div>
                      ))}
                      <div className='row'>
                        <div className='col-sm-6' style={{ display: "flex" }}>
                        </div>
                      </div>
                      <Card.Text>
                        {element.year}
                      </Card.Text>
                      <Card.Link href="#">{element.papertype}</Card.Link>
                      <div className="row">
                        <div className='col-sm-6 card-left'>
                          {/* <Button variant="primary" onClick={() => { View_Review(element.id) }} >View Reviews</Button> */}
                          <Button variant="dark" onClick={() => { rpc.reviewPaper(1, true) }} >See Abstract</Button>
                          <Button variant="success" onClick={() => { Publish(element.id) }}>Publish</Button>
                        </div>
                        <div className='col-sm-6 card-right' >
                            <Button className='btnwidth'  onClick={()=>downloadPaper("https://gateway.pinata.cloud/ipfs/"+ element.contentHash,element.title)} variant="danger">Download </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                </div>
              )
              )
            }
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewreview?.map((element ,index) => {
              return (
                <div key={index}>
                  <h6>{element.reviewer}</h6>
                  <p style={{ textAlign: 'justify' }}>{element.comment}</p>
                </div>
              )
            })}
          </Modal.Body>
        </Modal>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Abstract</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {abstract?.map((element,index) => {
              return (
                 <div key={index}>
                  <p style={{ textAlign: 'justify' }}>{element.abstract}</p>
                </div>
              )
            })}
          </Modal.Body>
        </Modal>
      </div> : <div>
        <h3 className='please'>{defaultContent}</h3>
      </div>}
    </div>
  )
}
export default Publisherpage


