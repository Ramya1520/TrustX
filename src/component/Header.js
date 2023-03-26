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
  const [publish,setpublish]=useState(true)
  const [allpaper,setAllpaper]=useState(false)
  const [requests,setRequests]=useState(false)
  const [Author,setAuthor]=useState(false)
  const [style,setStyle]=useState()
  const navigate=useNavigate()
  const Location=useLocation()
  
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
    navigate('/requests')
  }
  
  function Auth(){
    navigate('/authors')
  }
  function All(){  
 navigate('/allpaper')
  }
  function Pub(){
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
            <Button  onClick={() => Req()} className={Location.pathname === '/requests' ? 'text-blue' : 'text-black'} variant="light">Requests</Button>
            <Button onClick={() => Auth()}  className={Location.pathname === '/authors' ? 'text-blue' : 'text-black'}   variant="light">Authors</Button>
            <Button  onClick={() => All()}  className={Location.pathname === '/allpaper' ? 'text-blue' : 'text-black'}   variant="light">AllPapers</Button>
            <Button  onClick={() => Pub()} className={Location.pathname === '/' ? 'text-blue' : 'text-black'}   variant="light">Publish </Button>
          </div>
        </div>
      </div>
      </Navbar>
  );
}

export default Header;
