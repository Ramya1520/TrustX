import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './PublisherPage.css'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Rating from "react-rating-stars-component";
import './Allpaper.css'
import Header from './EnduserHeader';
import { useContext } from 'react';
import { UserContext } from "../App.js";
import './Enduserallpaper.css'

function Enduserallpaper() {
  const [publisherpage, setPublisherpage] = useState()
  const [filterdata, setFilterdata] = useState();
  const [viewreview, setViewreview] = useState()
  const [abstract, setAbstract] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const user = useContext(UserContext);
  const [feedback, setFeedback] = useState({user_id:user,feedback:"",rating:0});
  const [rating, setRating] = useState();
  const userob = Object.assign({}, user);
  const handleSubmit = () => {
  };

  useEffect(() => {
    fetch("https://b1db9323-a6f5-4c92-b089-17457f1cbb07.mock.pstmn.io/publisherpublish", {
      method: 'GET',
    }
    )
      .then(res => res.json())
      .then(data => {
        setPublisherpage(data)
        setFilterdata(data)
      })
      .catch(err => console.log(err));
  }, [])

  const See_Abstract = async (id) => {
    try {
      const response = await fetch("https://1b0b9541-6074-4786-9d00-98b5c74c99c4.mock.pstmn.io/abstracts", {
        method: 'POST',
        body: JSON.stringify({ "id": id }),
      })
      const data = await response.json();
      setAbstract(data);

    } catch (error) {
      console.log(error);
    }
    handleShow1()
  }

  const Give_feedback = async (id) => {
    handleShow()
  }
  const Submit = async (id) => {
    try {
      const response = await fetch("", {
        method: 'POST',
        body: JSON.stringify(feedback ),
      })
      const data = await response.json();
      setAbstract(data);

    } catch (error) {
      console.log(error);
    }
 
  handleClose()
  }
  const filterNames = e => {
    const search = e.target.value.toLowerCase()
    const filteredtitle = filterdata.filter(searchbar => searchbar.title.toLowerCase().includes(search))
    setPublisherpage(filteredtitle)
  }
  const ratingChanged = (newRating) => {
setRating(newRating)
  };
  return (
    <div>
      <Header/>
      <div className='card-space'>
        <input type="type" className='form-control  searchbar' onChange={(e) => filterNames(e)} placeholder="Search Title" />
        {
          publisherpage?.map((element, index) => (
            <div className='card-div'>
              <Card style={{ width: '90vw' }}>
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text>
                    {element.year}
                  </Card.Text>

                  <div className='row' style={{ display: "flex" }}>
                    <div className='col-sm-6' style={{ display: "flex" }}>
                      <Card.Text className="mb-2 text-muted">{element.author}</Card.Text>
                      <Card.Text className="mb-2 text-muted"> {"| "} </Card.Text>
                      <Card.Text className="mb-2 text-muted">{element.id}</Card.Text>
                    </div>
                    <div className='col-sm-6 stars'  >
                      <Rating
                        count={5}
                        value={feedback.rating}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                  <h5>{element.papertype}</h5>

                  <div className="row">
                    <div className='col-sm-6 card-left'>
                      <Button variant="dark" onClick={() => { See_Abstract(element.id) }} >See Abstract</Button>
                      <Button variant="primary" onClick={() => { Give_feedback() }} >Give Feedback</Button>
                      <Button variant="primary" onClick={() => { Give_feedback(element.id) }} >Vote</Button>
                    </div>
                    <div className='col-sm-6 card-right' >
                      <a href={element.url} download>
                        <Button className='btnwidth' variant="danger">Download </Button>
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )
          )
        }
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className='row field-gap'>
          <div className='col-sm-3'>
            <label>User  </label>
            </div>
            <div className='col-sm-9'>
            <input type="text" value={user} name="username" style={{"width":"70%"}}/>
            </div>
            <div className='col-sm-3'>
            <label>Feedback  </label>
            </div>
            <div className='col-sm-9'>
            <textarea placeholder='Give your feedback'style={{"width":"70%"}} value={feedback.feedback} onChange={e => setFeedback({
                    user_id: user[0],
                      feedback: e.target.value,
                      rating: rating
                  })
                  } name="feedback" />               
       </div>
       </div>
       <div className="submit">
          <Button onClick={Submit}>Submit</Button>
          </div>
        </form>
        </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Abstract</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {abstract?.map((element) => {
            return (
              <div>
                <p style={{ textAlign: 'justify' }}>{element.abstract}</p>
              </div>
            )
          })}
        </Modal.Body>
      </Modal>
      
    </div>
  )
}
export default Enduserallpaper