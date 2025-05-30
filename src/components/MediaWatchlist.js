import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/style.css';
import PopUpModel from './PopUpModel';

export default function MediaWatchlist() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" };
    const [mediaName, setMediaName] = useState('');
    const [nameGuess, setNameGuess] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [extraDetailsVisible, setExtraDetailsVisible] = useState(false);
    const [visibleMovieId, setVisibleMovieId] = useState(null);

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
        setLoading(true);
        fetch("https://api.brycejensenius.xyz/mediaWatch/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mediaName })
        })
        .then(res => res.json())
        .then(() => {
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
                        onClick={() => handleMovieClick(movie)}
                    >
                        <span className="bold-green">Name:</span>
                        <span className="light-bold"> {movie.mediaName}</span>
                        {visibleMovieId === movie.id && extraDetailsVisible && (
                            <PopUpModel
                                isVisible={extraDetailsVisible}
                                details={movieDetails}
                                onClose={() => setExtraDetailsVisible(false)}
                            />
                        )}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}