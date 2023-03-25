import { useEffect, useState } from 'react';
import Header from './Header'
import Card from 'react-bootstrap/Card';
import './PublisherPage.css'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
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

  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", process.env.REACT_APP_BACKEND_API);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "privatekey": process.env.REACT_APP_PRIVATE_KEY,
      "address": "0xcf5273eF64 C06d1A273C3634e73d9296fCf09e54",
      "isPublished": false
    });

    fetch(process.env.REACT_APP_BACKEND + "/api/publisher_home", {
      method: 'POST',
      headers: myHeaders,
      body: raw
    })
      .then(res => res.json())
      .then(data => {
        setPublisherpage(data.papers)
        setFilterdata(data.papers)
      })
      .catch(err => console.log(err));
  }, [])

  const Details = () => {
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
  }

  const View_Review = async (id) => {
    try {
      const response = await fetch("https://f98375b8-2beb-4b97-8f4d-863c96e09021.mock.pstmn.io/review", {
        method: 'POST',
        body: JSON.stringify({ "id": id }),
      })
      const data = await response.json();
      setViewreview(data);

    } catch (error) {
      console.log(error);
    }
    handleShow()
  }

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
  console.log(abstract,"dddd")

  const Publish = async (id) => {
    try {
      const response = await fetch("", {
        method: 'POST',
        body: JSON.stringify({ "id": id }),
      })
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
    Details()
  }

  const filterNames = e => {
    const search = e.target.value.toLowerCase()
    const filteredtitle = filterdata.filter(searchbar => searchbar.title.toLowerCase().includes(search))
    setPublisherpage(filteredtitle)
  }

  return (
    <div>
      <Header />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1, backgroundColor: "white" }}>
        <input type="type" className='form-control  searchbar' onChange={(e) => filterNames(e)} placeholder="Search Title" />
      </div>
      <div className='crd-1'>
        <div className='card-space'>
          {
            publisherpage?.map((element, index) => (
              <div className='card-div'>
                <Card style={{ width: '90vw' }}>
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <div className='row'>
                      <div className='col-sm-6' style={{ display: "flex" }}>
                        <Card.Subtitle className="mb-2 text-muted">{element.author}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"> {"| "} </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{element.id}</Card.Subtitle>
                      </div>
                    </div>
                    <Card.Text>
                      {element.year}
                    </Card.Text>
                    <Card.Link href="#">{element.papertype}</Card.Link>
                    <div className="row">
                      <div className='col-sm-6 card-left'>
                        <Button variant="primary" onClick={() => { View_Review(element.id) }} >View Reviews</Button>
                        <Button variant="dark" onClick={() => { See_Abstract(element.id) }} >See Abstract</Button>
                        <Button variant="success" onClick={() => { Publish(element.id) }}>Publish</Button>
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
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewreview?.map((element) => {
            return (
              <div>
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
export default Publisherpage

// [
//   {
//     "id": 1,
//     "title": "The Great Gatsby",
//     "author": "F. Scott Fitzgerald",
//     "year": 1925,
//     "papertype": "Novel",
//     "publisher": "Charles Scribner's Sons",
//     "review": "A classic American novel about the Jazz Age."
//   },
//   {
//     "id": 2,
//     "title": "To Kill a Mockingbird",
//     "author": "Harper Lee",
//     "year": 1960,
//     "papertype": "Novel",
//     "publisher": "J. B. Lippincott & Co.",
//     "review": "A masterpiece of American literature about racial injustice and childhood innocence."
//   },
//   {
//     "id": 3,
//     "title": "1984",
//     "author": "George Orwell",
//     "year": 1949,
//     "papertype": "Novel",
//     "publisher": "Secker & Warburg",
//     "review": "A dystopian novel that warns of the dangers of totalitarianism and mass surveillance."
//   },
//   {
//     "id": 4,
//     "title": "The Catcher in the Rye",
//     "author": "J. D. Salinger",
//     "year": 1951,
//     "papertype": "Novel",
//     "publisher": "Little, Brown and Company",
//     "review": "A coming-of-age novel that has become a classic of American literature."
//   },
//   {
//     "id": 5,
//     "title": "The Hobbit",
//     "author": "J. R. R. Tolkien",
//     "year": 1937,
//     "papertype": "Novel",
//     "publisher": "George Allen & Unwin",
//     "review": "A children's fantasy novel that is also enjoyed by adults."
//   },
//   {
//     "id": 6,
//     "title": "The Lord of the Rings",
//     "author": "J. R. R. Tolkien",
//     "year": 1954,
//     "papertype": "Novel",
//     "publisher": "George Allen & Unwin",
//     "review": "A classic high fantasy novel that has inspired generations of readers."
//   },
//   {
//     "id": 7,
//     "title": "Pride and Prejudice",
//     "author": "Jane Austen",
//     "year": 1813,
//     "papertype": "Novel",
//     "publisher": "T. Egerton, Whitehall",
//     "review": "A beloved novel about love and marriage in Georgian England."
//   },
//   {
//     "id": 8,
//     "title": "Jane Eyre",
//     "author": "Charlotte Brontë",
//     "year": 1847,
//     "papertype": "Novel",
//     "publisher": "Smith, Elder & Co.",
//     "review": "A gothic romance novel that is still popular today."
//   },
//   {
//     "id": 9,
//     "title": "The Adventures of Huckleberry Finn",
//     "author": "Mark Twain",
//     "year": 1884,
//     "papertype": "Novel",
//     "publisher": "Chatto & Windus",
//     "review": "A classic American novel about race, childhood, and friendship."
//   }
// ]

