import { useEffect, useState } from 'react';
import Login from './Login'
import Logo from './assets/Logo.png'
import './Header.css'
import Button from 'react-bootstrap/Button';
import { Navbar, Nav } from "react-bootstrap";
import { Navigate,useNavigate } from 'react-router-dom';
import Allpaper from './Allpaper';
import { useLocation } from 'react-router-dom';
function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [publish,setpublish]=useState(false)
  const [allpaper,setAllpaper]=useState(true)
  const [requests,setRequests]=useState(false)
  const [Author,setAuthor]=useState(false)
  const Location=useLocation()
  const navigate=useNavigate()

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

  function Chat(){
  }
  
  function Auth(){
    navigate('/enduserauthor')
  }
  function All(){  
 navigate('/enduserallpaper')
  }
  function Notification(){
  }
  return (
    <Navbar className={navbarClass} expand="lg" fixed="top">
      <div className='row header-row ' style={{width:"100vw",backgroundColor:"white" }}>
        <div className='col-sm-12 left-header'>
          <div className='col-sm-6 btnlogo'>
            <img src={Logo} className="logo" style={{ width: "50px", height: "50px" }}></img>
            <Login/>
          </div>
          <div className='col-sm-6 btnspace'>
            <Button  variant="light">Notification</Button>
            <Button  variant="light">Chat </Button>
            <Button  onClick={() => Auth()}  className={Location.pathname === '/enduserauthor' ? 'text-blue' : 'text-black'}  variant="light">Authors</Button>
            <Button  onClick={() => All()}  className={Location.pathname === '/enduserallpaper' ? 'text-blue' : 'text-black'}  variant="light">AllPapers</Button>
         
          </div>
        </div>
      </div>
      </Navbar>
  );
}

export default Header;
