import { useEffect, useState } from 'react';
import Login from './Login'
import Logo from './assets/Logo.png'
import './Header.css'
import Button from 'react-bootstrap/Button';
import { Navbar, Nav } from "react-bootstrap";
import { Navigate,useNavigate } from 'react-router-dom';
import Allpaper from './Allpaper';
function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [publish,setpublish]=useState(true)
  const [allpaper,setAllpaper]=useState(false)
  const [requests,setRequests]=useState(false)
  const [Author,setAuthor]=useState(false)
  const [style,setStyle]=useState()
  const navigate=useNavigate()
  
  useEffect(()=>{
    console.log(allpaper)
  },[allpaper])

  const [scrollPosition, setScrollPosition] = useState(0);
  const navbarClass = scrollPosition > 0 ? "navbar1 shadow bc" : "navbar1"
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function Req(){
    setRequests(true)
    setAuthor(false)
    setAllpaper(false)
    setpublish(false)
  }
  
  function Auth(){
    setRequests(false)
    setAuthor(true)
    setAllpaper(false)
    setpublish(false)
    navigate('/authors')
  }
  
  function All(){  
    setAllpaper(true)
    setRequests(false)
    setAuthor(false)
    setpublish(false)
 navigate('/allpaper')
  }

  
  function Pub(){
    setRequests(false)
    setAuthor(false)
    setAllpaper(false)
    setpublish(true)
    navigate('/')
  }
  return (
    <Navbar className={""} expand="lg" fixed="top">
      <div className='row header-row ' style={{width:"100vw",backgroundColor:"white" }}>
        <div className='col-sm-12 left-header'>
          <div className='col-sm-6 btnlogo'>
            <img src={Logo} className="logo" style={{ width: "50px", height: "50px" }}></img>
            <Login/>
          </div>
          <div className='col-sm-6 btnspace'>
            <Button onClick={() => Req()} className={requests?"text-blue":"text-black"}  variant="light">Requests</Button>
            <Button onClick={() => Auth()} className={Author?"text-blue":"text-black"}  variant="light">Authors</Button>
            <Button  onClick={() => All()} className={allpaper?"text-blue":"text-black"}  variant="light">AllPapers</Button>
            <Button  onClick={() => Pub()} className={publish?"text-blue":"text-black"}  variant="light">Publish </Button>
          </div>
        </div>
      </div>
      </Navbar>
  );
}

export default Header;
