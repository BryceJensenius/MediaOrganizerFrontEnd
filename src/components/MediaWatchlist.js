import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/style.css';
import PopUpModel from './PopUpModel';
import { useNavigate } from 'react-router-dom';

export default function MediaWatchlist() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" };
    const [mediaName, setMediaName] = useState('');
    const [nameGuess, setNameGuess] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [extraDetailsVisible, setExtraDetailsVisible] = useState(false);
    const [visibleMovieId, setVisibleMovieId] = useState(null);

    // Pulling in Watchlist Movie to MediaHandler
    const navigate = useNavigate();

    const pullMovieClick = (movieName) => {
        // Save the movie name to localStorage
        localStorage.setItem('selectedMovieName', movieName);
        // Navigate to the MediaHandler page
        navigate('/');
    };

    // Fetch all movies in the watchlist
    const getWatchlist = () => {
        setLoading(true);
        fetch("https://api.brycejensenius.xyz/mediaWatch/getAll")
            .then(res => res.json())
            .then((result) => {
                setWatchlist(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching watchlist:", error);
                setLoading(false);
            });
    };

    // Get movie name suggestions
    const getClosestNames = (title) => {
        if (title.trim() === '') {
            setNameGuess([]);
            return;
        }
        fetch(`https://api.brycejensenius.xyz/api/omdb/getTitles/${title}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok){
                throw new Error('Network response Failed');
            }
            return res.json();
        }).then((result) => {
            if(Array.isArray(result)){
                setNameGuess(result);
            }else{
                setNameGuess([]);
            }
        }).catch(() => setNameGuess([]));
    };

    // Set input to guessed name
    const setMediaWithGuess = (guessTitle) => {
        setMediaName(guessTitle);
        setNameGuess([]);
    };

    // Add movie to watchlist
    const handleAdd = (e) => {
        e.preventDefault();
        if (mediaName.trim() === '') {
            alert("Movie Media Name cannot be empty");
            return;
        }
        console.log("Adding movie: %s", mediaName);
        setLoading(true);
        fetch("https://api.brycejensenius.xyz/mediaWatch/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mediaName })
        })
        .then(res => res.text())
        .then((message) => {
            console.log("Server response:", message); // e.g., "New Media Watch List Item Was Added"
            setMediaName('');
            setNameGuess([]);
            getWatchlist();
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error adding to watchlist:", error);
            setLoading(false);
        });
    };

    // Show more details for a movie
    const getMovieDetails = (title, id) => {
        fetch(`https://api.brycejensenius.xyz/api/omdb/getFullInfo/${title}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                return res.json();
            })
            .then((arrayParam) => {
                if(Array.isArray(arrayParam)){
                    setMovieDetails(arrayParam);
                }else{
                    setMovieDetails([]);
                }
                setExtraDetailsVisible(true);
                setVisibleMovieId(id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Toggle details modal
    const handleMovieClick = (movie) => {
        if (visibleMovieId === movie.id && extraDetailsVisible) {
            setExtraDetailsVisible(false);
            setVisibleMovieId(null);
        } else {
            getMovieDetails(movie.mediaName, movie.id);
        }
    };

    useEffect(() => {
        getWatchlist();
    }, []);

    return (
        <Container maxWidth="mw" className='backgroundStyle'>
            {/* Add to Watchlist */}
            <Box component="form" noValidate autoComplete="off">
                <Paper elevation={5} style={paperStyle}>
                    <Typography 
                        variant="h4" 
                        component="h1"
                        sx={{
                            fontFamily: 'Arial, serif',
                            color: "black",
                            textAlign: "center",
                            marginBottom: 2,
                            fontWeight: '400',
                        }}
                    >
                        Add to Watchlist
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField 
                            id="outlined-basic-name" 
                            label="Movie Name" 
                            variant="outlined" 
                            fullWidth 
                            value={mediaName}
                            onChange={(e) => {
                                setMediaName(e.target.value);
                                getClosestNames(e.target.value);
                            }}
                        />
                    </Box>
                    {/* Guess Names */}
                    {nameGuess.length !== 0 && (
                        <Paper elevation={1} className="guessItem">
                            {nameGuess.map((mediaTitle, index) => (
                                <span
                                    key={index}
                                    onClick={() => setMediaWithGuess(mediaTitle)}
                                    className="bold-green"
                                    style={{ cursor: 'pointer' }}
                                >{mediaTitle}<br /></span>
                            ))}
                        </Paper>
                    )}
                    <Button 
                        variant="contained" 
                        className="greenButton" 
                        onClick={handleAdd}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} /> : "Add to Watchlist"}
                    </Button>
                </Paper>
            </Box>

            {/* Watchlist Display */}
            <Paper elevation={5} style={paperStyle}>
                <Typography 
                    variant="h4" 
                    component="h1"
                    sx={{
                        fontFamily: 'Arial, serif',
                        color: "#222222",
                        textAlign: "center",
                        marginBottom: 2,
                        fontWeight: '400',
                    }}
                >
                    Watchlist
                </Typography>
                {loading && <CircularProgress size={24} sx={{ mb: 2 }} />}
                {Array.isArray(watchlist) && watchlist.length === 0 && !loading && (
                    <Typography>No movies in your watchlist.</Typography>
                )}
                {Array.isArray(watchlist) && watchlist.map(movie => (
                    <Paper 
                        elevation={1} 
                        className="mediaItem" 
                        key={movie.id}
                        onClick={() => setVisibleMovieId(movie.id === visibleMovieId ? null : movie.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="bold-green">Name:</span>
                        <span className="light-bold"> {movie.mediaName}</span>
                        {visibleMovieId === movie.id && (
                            <div style={{ marginTop: 8 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    style={{ fontSize: '0.7rem', borderRadius: '8px', marginRight: 8 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        pullMovieClick(movie.mediaName);
                                    }}
                                >
                                    Pull to MediaHandler
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    style={{ fontSize: '0.7rem', borderRadius: '8px' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMovieClick(movie);
                                    }}
                                >
                                    {extraDetailsVisible && visibleMovieId === movie.id ? "Hide Details" : "Show Details"}
                                </Button>
                                {extraDetailsVisible && visibleMovieId === movie.id && (
                                    <PopUpModel
                                        isVisible={extraDetailsVisible}
                                        details={movieDetails}
                                        onClose={() => setExtraDetailsVisible(false)}
                                    />
                                )}
                            </div>
                        )}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}