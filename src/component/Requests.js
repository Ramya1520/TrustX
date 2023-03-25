import { useEffect, useState } from 'react';
import Header from './Header'
import Card from 'react-bootstrap/Card';
import './PublisherPage.css'
import './Authors.css'
import { Button } from 'react-bootstrap';
import profile from './assets/profile7.png'
function Requests() {
    const [authorsdetail, setAuthorsdetail] = useState();
    const [filterdata, setFilterdata] = useState();
    useEffect(() => {
        fetch("https://49bf9624-3f5a-4856-bc0e-0ea4216a24b6.mock.pstmn.io/authors", {
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

    const Details = () => {
        fetch("https://49bf9624-3f5a-4856-bc0e-0ea4216a24b6.mock.pstmn.io/authors", {
            method: 'GET',
        }
        )
            .then(res => res.json())
            .then(data => {
                setAuthorsdetail(data)
                setFilterdata(data)
            })
            .catch(err => console.log(err));
    }

    const Delete_request = async (id) => {
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
        console.log(search, "search")
        const filteredtitle = filterdata.filter(searchbar => searchbar.author.toLowerCase().includes(search))
        setAuthorsdetail(filteredtitle)
    }

    return (
        <div>
            <Header />
            <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1, backgroundColor: "white" }}>
                <input type="type" className='form-control  searchbar' onChange={(e) => filterNames(e)} placeholder="Search Title" />
            </div>
            <div className='crd-1'>
                <div>
                    <div className='card-space row  card-dir'>
                        {
                            authorsdetail?.map((element, index) => (
                                <div className=' col-sm-3'>
                                    <Card style={{ width: "116%" }} >
                                        <Card.Body className='row over-row' >
                                            <div className='col-sm-12 ' style={{ display: "flex" }}>
                                                <div className='col-sm-6'>
                                                    <img src={profile} className="profile1" alt="profile" />
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
                                                <Button variant="success">View Status</Button>
                                                <Button variant="danger" onClick={() => { Delete_request(element.id) }} >Delete Request</Button>
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
export default Requests

