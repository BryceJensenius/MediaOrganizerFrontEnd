import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/navStyle.css';

const NavBar = () => {
  const [headingToggleState, setHeadingToggleState] = useState(false);

  const toggleButtonRef = useRef(null);
  const navItemsRef = useRef(null);
  const headNavigationRef = useRef(null);
  const headerRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    const handleNavVisibility = () => {
      if (navItemsRef.current && headNavigationRef.current && headerRef.current && toggleButtonRef.current) {
        if (window.innerWidth > 800) {
          navItemsRef.current.classList.add('show');
          headNavigationRef.current.classList.add('justify-content-center');
          headerRef.current.style.padding = '15px 0';
          headerRef.current.style.marginBottom = '15px';
          toggleButtonRef.current.style.display = 'none';
        } else {
          toggleButtonRef.current.style.display = '';
          headNavigationRef.current.classList.remove('justify-content-center');
          if (navItemsRef.current.classList.contains('show')) {
            navItemsRef.current.classList.remove('show');
            headerRef.current.style.padding = '3px 10px';
            headerRef.current.style.marginBottom = '15px';
            setHeadingToggleState(false);
          }
        }
      }
    };

    window.addEventListener('resize', handleNavVisibility);
    handleNavVisibility();
    return () => {
      window.removeEventListener('resize', handleNavVisibility);
    };
  }, []);

  const handleToggleClick = () => {
    if (navItemsRef.current && headerRef.current) {
      if (!headingToggleState) {
        navItemsRef.current.classList.add('show');
        headerRef.current.style.padding = '15px 10px';
        headerRef.current.style.marginBottom = '3px';
        setHeadingToggleState(true);
      } else {
        navItemsRef.current.classList.remove('show');
        headerRef.current.style.padding = '3px 10px';
        headerRef.current.style.marginBottom = '15px';
        setHeadingToggleState(false);
      }
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'currentPageIcon sub_title' : 'sub_title';
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleToggleClick}
              ref={toggleButtonRef}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <span className="main_title">Media Organizer</span>
            </Typography>
            <nav className="headNav" id="headNavElem" ref={headNavigationRef}>
              <ul id="navItems" ref={navItemsRef} style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ marginRight: '20px' }}>
                  <Link to="/" className={getLinkClass('/')} style={{ color: 'white', textDecoration: 'none' }}>
                    Media
                  </Link>
                </li>
                <li>
                  <Link to="/watchlist" className={getLinkClass('/watchlist')} style={{ color: 'white', textDecoration: 'none' }}>
                    Watchlist
                  </Link>
                </li>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;