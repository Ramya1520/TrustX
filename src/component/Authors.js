import { useEffect, useState } from 'react';
import Header from './Header'
import Card from 'react-bootstrap/Card';
import './PublisherPage.css'
import './Authors.css'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import profile from './assets/profile7.png'
function Authors() {
    const [authorsdetail, setAuthorsdetail] = useState()
    const [filterdata, setFilterdata] = useState();
    const [filteredtitle, setFilteredtitle] = useState()
    const [viewreview, setViewreview] = useState()
    const [abstract, setAbstract] = useState({})
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    useEffect(() => {
        fetch("https://9d857f02-fcdd-416c-a11a-f8250e639b92.mock.pstmn.io/authors", {
            method: 'GET',
        }
        )
            .then(res => res.json())
            .then(data => {
                setAuthorsdetail(data)
                setFilterdata(data)
            })
            .catch(err => console.log(err));
    }, [])
    const View_Review = async (id) => {
        try {
            const response = await fetch("https://a6034ad5-bd81-4269-9b59-c2297d5c1294.mock.pstmn.io/viewreview", {
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
    console.log(viewreview, "--------------")

    const See_Abstract = async (id) => {
        try {
            const response = await fetch("https://9d3cfcba-3b6c-4a81-8eab-4086ff838dcc.mock.pstmn.io/seeabstract", {
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
    const filterNames = e => {
        const search = e.target.value.toLowerCase()
        setFilteredtitle(filterdata.filter(searchbar => searchbar.title.toLowerCase().includes(search)))
        setAuthorsdetail(filteredtitle)
    }

    return (
        <div>
            <Header />
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1,
                backgroundColor: "white"
            }}>
                <input type="type" className='form-control  searchbar' onChange={(e) => filterNames(e)} placeholder="Search Title" />
            </div>
            <div className='crd-1'>
                <div>
                <div className='card-space row  card-dir'>
                    {
                        authorsdetail?.map((element, index) => (
                            <div className=' col-sm-3'>
                                <Card style={{width:"116%"}} >
                                    <Card.Body className='row over-row' >
                                        <div className='col-sm-12 ' style={{display:"flex"}}>
                                            <div className='col-sm-6'>
                                                <img src={profile}  className="profile1" alt="profile" />
                                            </div>
                                            <div className='col-sm-6'>
                                                <Card.Title>{element.author}</Card.Title>
                                                <div className='row'>
                                                    <div className='col-sm-12'>
                                                        <Card.Text className="mb-2 text-muted">{element.role}</Card.Text>
                                                        <div className='org'>
                                                        <h6 className="mb-2">{element.organization}</h6>
                                                        </div>
                                                     </div>                
                                                </div>
                                            </div>  
                                        </div>
                                        <div className='row'>
                                        <div className='col-sm-6'>
                                            <Card.Text>
                                               Publications: {element.publications}
                                            </Card.Text>
                                            </div>
                                            <div className='col-sm-6'>
                                            <Card.Text className='cit'>
                                               Citations: {element.citations}
                                            </Card.Text>
                                            </div>
                                            </div>  
                                            <div className='see-send row'>   
                                             <Button variant="success" onClick={() => { See_Abstract(element.id) }} >See Followers</Button>
                                             <Button variant="primary" onClick={() => { View_Review(element.id) }} >Send Requests</Button>
                                             </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                        )
                    }
                </div>
                </div>
            </div>

        </div>
    )
}
export default Authors


// [{"author":"Arun","organization":"Isro","role":"atomic nuclear scientist","publications":"30","citations":"54","followers":["ram","seenu","mukil","akhil","sarath"]},{"author":"nikil","organization":"Isro","role":"atomic nuclear scientist","publications":"30","citations":"54","followers":["ram","seenu","mukil","akhil","sarath"]},{"author":"sarath","organization":"Isro","role":"atomic nuclear scientist","publications":"30","citations":"54","followers":["ram","seenu","mukil","akhil","sarath"]}]
