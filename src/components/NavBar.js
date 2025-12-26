import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import '../styles/navStyle.css';
import { isAuthenticated, clearSessionToken } from '../utils/auth';

const NavBar = () => {
  const [headingToggleState, setHeadingToggleState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleButtonRef = useRef(null);
  const navItemsRef = useRef(null);
  const headNavigationRef = useRef(null);
  const headerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on mount and route change
    setIsLoggedIn(isAuthenticated());
  }, [location]);

  const handleLogout = () => { // Redirect to login page after logging out
    clearSessionToken();
    setIsLoggedIn(false);
    navigate('/');
  };

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

  // Only show nav items if user is logged in or on login page
  const shouldShowNav = isLoggedIn || location.pathname === '/';

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg,#4caf50,#2e7d32)' }}>
          <Toolbar ref={headerRef}>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleToggleClick}
              ref={toggleButtonRef}
              className="hamburger"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
              <span className="main_title">Project Hub</span>
            </Typography>
            {shouldShowNav && (
              <nav className="headNav" id="headNavElem" ref={headNavigationRef}>
                <ul id="navItems" ref={navItemsRef} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
                  {!isLoggedIn && (
                    <>
                      <li style={{ marginRight: '20px' }}>
                        <a href="https://club.brycejensenius.xyz/" target="_blank" rel="noopener noreferrer" className="nav-link">
                          Club
                        </a>
                      </li>
                      <li style={{ marginRight: '20px' }}>
                        <Link to="/loginpage" className={getLinkClass('/loginpage')} style={{ color: 'white', textDecoration: 'none' }}>
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                  {isLoggedIn && (
                    <>
                      <li style={{ marginRight: '20px' }}>
                        <Link to="/" className={getLinkClass('/')} style={{ color: 'white', textDecoration: 'none' }}>
                          About Me
                        </Link>
                      </li>
                      <li style={{ marginRight: '20px' }}>
                        <Link to="/media" className={getLinkClass('/media')} style={{ color: 'white', textDecoration: 'none' }}>
                          Media
                        </Link>
                      </li>
                      <li style={{ marginRight: '20px' }}>
                        <Link to="/watchlist" className={getLinkClass('/watchlist')} style={{ color: 'white', textDecoration: 'none' }}>
                          Watchlist
                        </Link>
                      </li>
                      <li style={{ marginRight: '20px' }}>
                        <Link to="/boardGames" className={getLinkClass('/boardGames')} style={{ color: 'white', textDecoration: 'none' }}>
                          Board Games
                        </Link>
                      </li>
                      <li style={{ marginRight: '20px' }}>
                        <a href="https://club.brycejensenius.xyz/" target="_blank" rel="noopener noreferrer" className="nav-link">
                          Club
                        </a>
                      </li>
                      <li>
                        <Button 
                          onClick={handleLogout}
                          sx={{ 
                            color: 'white',
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                          }}
                        >
                          Logout
                        </Button>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;