import { useEffect, useState } from 'react';
import Header from './Header'
import Card from 'react-bootstrap/Card';
import './PublisherPage.css'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Rating from "react-rating-stars-component";
import './Allpaper.css'

function Allpaper(){
  const [publisherpage, setPublisherpage] = useState()
  const [filterdata, setFilterdata] = useState();
  const [filteredtitle, setFilteredtitle] = useState()
  const [viewreview, setViewreview] = useState()  
  const [abstract, setAbstract] = useState()  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
 
    useEffect(() => {
      fetch("https://64ebec64-670e-470e-a869-3003ebf39979.mock.pstmn.io/publisherpublish", {
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
        const response = await fetch("https://9d3cfcba-3b6c-4a81-8eab-4086ff838dcc.mock.pstmn.io/seeabstract", {
          method: 'POST',
          body: JSON.stringify({"id":id}),
        })
        const data = await response.json();
        setAbstract(data);
        
      } catch (error) {
        console.log(error);
      }
      handleShow()
    }
    const View_Review = async (id) => {
      try {
        const response = await fetch("https://a6034ad5-bd81-4269-9b59-c2297d5c1294.mock.pstmn.io/viewreview", {
          method: 'POST',
          body: JSON.stringify({"id":id}),
        })
        const data = await response.json();
        setViewreview(data);
        
      } catch (error) {
        console.log(error);
      }
      handleShow1()
    }
    const filterNames = e => {
      const search = e.target.value.toLowerCase()
      setFilteredtitle(filterdata.filter(searchbar => searchbar.title.toLowerCase().includes(search)))
      setPublisherpage(filteredtitle)
    }
    const ratingChanged = (newRating) => {
      console.log(newRating);
    };
    
  
   
    return(
        <div>
            <Header />   
            <div className='card-space'> 
            <input type="type" className='form-control  searchbar' onChange={(e) => filterNames(e)} placeholder="Search Title" />  
       {
            publisherpage?.map((element,index)=>(
            <div className='card-div'>
            <Card style={{ width: '90vw' }}>
      <Card.Body>
        <Card.Title>{element.title}</Card.Title>
        <Card.Text>
        {element.year}
        </Card.Text>
     
        <div className='row' style={{display:"flex"}}>
                    <div  className='col-sm-6' style={{display:"flex"}}>
                    <Card.Text className="mb-2 text-muted">{element.author}</Card.Text>
                    <Card.Text className="mb-2 text-muted"> {"| "} </Card.Text>
                    <Card.Text className="mb-2 text-muted">{element.id}</Card.Text>
                    </div>
                    <div className='col-sm-6 stars'  >
                    <Rating
        count={5}
        onChange={ratingChanged}
        size={24}
        edit={false}
        value={2}   
        activeColor="#ffd700"
      />
                    </div>
        </div>
        <h5>{element.papertype}</h5>
        
        <div className="row">
            <div className='col-sm-6 card-left'>
                        <Button variant="dark" onClick={() => { See_Abstract(element.id) }} >See Abstract</Button>
                        <Button variant="primary" onClick={() => { View_Review(element.id) }} >View Feedback</Button>
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
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewreview?.map((element)=>{
           return(
            <div>
               <h6>{element.reviewer}</h6>
               <p style={{textAlign:'justify'}}>{element.comment}nnmmmmmmmbhjhjv hjhb jbjh njjn j nj jhghgjhghughjgj  iuhi hiuhiniuniiuniuhuiu  huhuihiuhiuhuj hiuuhiu iuhiuhiu  iu iuh h  uhiuhiuhi u  giu h   hu h ui  hiuh uihu</p>
          {console.log(element.comment,"-------------com")}
          {console.log(element.reviewer,"--------------rev")}
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
          {abstract?.map((element)=>{
           return(
            <div>
               <p style={{textAlign:'justify'}}>{element.abstract}</p>
          </div>
           )
          })}
        </Modal.Body>
      </Modal>          
    </div>
      
    )
}
export default Allpaper